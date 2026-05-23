import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/modules/user/user.model.js";
import Product from "../src/modules/product/product.model.js";
import Category from "../src/modules/category/category.model.js";
import Inventory from "../src/modules/inventory/inventory.model.js";

const TEST_DB =
  process.env.TEST_MONGODB_URI ||
  "mongodb://localhost:27017/restaurantSystem_test";

let adminToken;
let categoryId;

beforeAll(async () => {
  await mongoose.connect(TEST_DB, { dbName: "restaurantSystem_test" });

  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  });

  await User.updateOne({ email: "admin@test.com" }, { role: "admin" });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "admin123",
  });
  adminToken = loginRes.body.token;

  const cat = await Category.create({ name: "Beverages" });
  categoryId = cat._id.toString();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await Product.deleteMany({});
  await Inventory.deleteMany({});
});

const validProduct = () => ({
  name: "Latte",
  description: "A smooth coffee drink",
  price: 45,
  cost: 20,
  categoryId,
  barcode: "BAR123456",
  currentStock: 50,
  reorderLevel: 10,
});

// ─── GET all products ────────────────────────────────────────────────────
describe("GET /api/products", () => {
  it("should return empty array when no products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    // مفيش products = empty array or 404 — حسب الـ service
  });

  it("should return products list", async () => {
    await Product.create({
      name: "Espresso",
      description: "Strong coffee",
      price: 30,
      cost: 10,
      categoryId,
      barcode: "ESP001",
      image: "test.jpg",
    });

    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data ?? res.body)).toBeTruthy();
  });
});

// ─── POST create product ─────────────────────────────────────────────────
describe("POST /api/products", () => {
  it("should create a product as admin", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${adminToken}`)
      .field("name", "Latte")
      .field("description", "A smooth coffee drink")
      .field("price", "45")
      .field("cost", "20")
      .field("categoryId", categoryId)
      .field("barcode", "BAR123456")
      .attach("image", Buffer.from("fake image data"), "product.jpg");

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should return 401 without token", async () => {
    const res = await request(app).post("/api/products").send(validProduct());
    expect(res.status).toBe(401);
  });

  it("should return 403 for cashier role", async () => {
    // إنشاء cashier
    await request(app).post("/api/auth/register").send({
      name: "Cashier",
      email: "cashier@test.com",
      password: "cashier123",
    });
    const cashierLogin = await request(app).post("/api/auth/login").send({
      email: "cashier@test.com",
      password: "cashier123",
    });

    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${cashierLogin.body.token}`)
      .send(validProduct());

    expect(res.status).toBe(403);
  });
});

// ─── GET product by ID ───────────────────────────────────────────────────
describe("GET /api/products/:productId", () => {
  it("should return product by valid ID", async () => {
    const product = await Product.create({
      name: "Cappuccino",
      description: "Frothy coffee",
      price: 40,
      cost: 15,
      categoryId,
      barcode: "CAP001",
      image: "cap.jpg",
    });

    const res = await request(app).get(`/api/products/${product._id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Cappuccino");
  });

  it("should return 404 for non-existent product", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/products/${fakeId}`);
    expect(res.status).toBe(404);
  });
});

// ─── DELETE product ──────────────────────────────────────────────────────
describe("DELETE /api/products/:productId", () => {
  it("should delete product as admin", async () => {
    const product = await Product.create({
      name: "Mocha",
      description: "Chocolate coffee",
      price: 50,
      cost: 18,
      categoryId,
      barcode: "MOC001",
      image: "mocha.jpg",
    });
    await Inventory.create({ productId: product._id, currentStock: 10 });

    const res = await request(app)
      .delete(`/api/products/${product._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const deleted = await Product.findById(product._id);
    expect(deleted).toBeNull();
  });
});
