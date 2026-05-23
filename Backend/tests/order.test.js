import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/modules/user/user.model.js";
import Product from "../src/modules/product/product.model.js";
import Category from "../src/modules/category/category.model.js";
import Order from "../src/modules/order/order.model.js";
import Counter from "../src/modules/counter/counter.model.js";

const TEST_DB =
  process.env.TEST_MONGODB_URI ||
  "mongodb://localhost:27017/restaurantSystem_test";

let cashierToken;
let adminToken;
let productId;

beforeAll(async () => {
  await mongoose.connect(TEST_DB, { dbName: "restaurantSystem_test" });

  // Admin
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin_order@test.com",
    password: "admin123",
  });
  await User.updateOne({ email: "admin_order@test.com" }, { role: "admin" });
  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "admin_order@test.com",
    password: "admin123",
  });
  adminToken = adminLogin.body.token;

  // Cashier
  await request(app).post("/api/auth/register").send({
    name: "Cashier",
    email: "cashier_order@test.com",
    password: "cashier123",
  });
  const cashierLogin = await request(app).post("/api/auth/login").send({
    email: "cashier_order@test.com",
    password: "cashier123",
  });
  cashierToken = cashierLogin.body.token;

  // Product
  const cat = await Category.create({ name: "Food" });
  const product = await Product.create({
    name: "Burger",
    description: "Beef burger",
    price: 80,
    cost: 35,
    categoryId: cat._id,
    barcode: "BRG001",
    image: "burger.jpg",
  });
  productId = product._id.toString();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await Order.deleteMany({});
  await Counter.deleteMany({});
});

const validOrder = () => ({
  items: [{ productId, quantity: 2 }],
  paymentMethod: "cash",
  orderType: "takeaway",
});

// ─── Create Order ─────────────────────────────────────────────────────────
describe("POST /api/order", () => {
  it("should create order as cashier", async () => {
    const res = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.orderNumber).toBeDefined();
    expect(res.body.data.total).toBe(160); // 80 * 2
    expect(res.body.data.cashierId).toBeDefined();
  });

  it("should return 401 without token", async () => {
    const res = await request(app).post("/api/order").send(validOrder());
    expect(res.status).toBe(401);
  });

  it("should return 400 if items array is empty", async () => {
    const res = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({ ...validOrder(), items: [] });

    expect(res.status).toBe(400);
  });

  it("should return 404 if product not found", async () => {
    const fakeProductId = new mongoose.Types.ObjectId().toString();
    const res = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({
        items: [{ productId: fakeProductId, quantity: 1 }],
        paymentMethod: "cash",
      });

    expect(res.status).toBe(404);
  });

  it("should apply discount correctly", async () => {
    const res = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send({ ...validOrder(), discount: 20 });

    expect(res.status).toBe(200);
    expect(res.body.data.total).toBe(140); // 160 - 20
  });

  it("should generate unique order numbers", async () => {
    const res1 = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const res2 = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    expect(res1.body.data.orderNumber).not.toBe(res2.body.data.orderNumber);
  });
});

// ─── Get Orders ────────────────────────────────────────────────────────────
describe("GET /api/order", () => {
  it("should return paginated orders list", async () => {
    await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const res = await request(app)
      .get("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.body.pagination).toBeDefined();
    expect(res.body.pagination.total).toBeGreaterThan(0);
  });
});

// ─── Get Order By ID ───────────────────────────────────────────────────────
describe("GET /api/order/:orderId", () => {
  it("should return order by valid ID", async () => {
    const createRes = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const orderId = createRes.body.data._id;

    const res = await request(app)
      .get(`/api/order/${orderId}`)
      .set("Authorization", `Bearer ${cashierToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(orderId);
  });

  it("should return 404 for non-existent order", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .get(`/api/order/${fakeId}`)
      .set("Authorization", `Bearer ${cashierToken}`);

    expect(res.status).toBe(404);
  });
});

// ─── Cancel Order ──────────────────────────────────────────────────────────
describe("PATCH /api/order/:orderId/cancel", () => {
  it("should cancel a pending order", async () => {
    const createRes = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const orderId = createRes.body.data._id;

    const res = await request(app)
      .patch(`/api/order/${orderId}/cancel`)
      .set("Authorization", `Bearer ${cashierToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should return 400 when trying to cancel an already cancelled order", async () => {
    const createRes = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const orderId = createRes.body.data._id;

    await request(app)
      .patch(`/api/order/${orderId}/cancel`)
      .set("Authorization", `Bearer ${cashierToken}`);

    const res = await request(app)
      .patch(`/api/order/${orderId}/cancel`)
      .set("Authorization", `Bearer ${cashierToken}`);

    expect(res.status).toBe(400);
  });
});

// ─── Pay Cash ──────────────────────────────────────────────────────────────
describe("PATCH /api/order/:orderId/pay-cash", () => {
  it("should mark cash order as paid", async () => {
    const createRes = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const orderId = createRes.body.data._id;

    const res = await request(app)
      .patch(`/api/order/${orderId}/pay-cash`)
      .set("Authorization", `Bearer ${cashierToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.paymentStatus).toBe("paid");
    expect(res.body.data.status).toBe("completed");
  });
});

// ─── Delete Order ──────────────────────────────────────────────────────────
describe("DELETE /api/order/:orderId", () => {
  it("should delete order as admin", async () => {
    const createRes = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const orderId = createRes.body.data._id;

    const res = await request(app)
      .delete(`/api/order/${orderId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should return 403 if cashier tries to delete order", async () => {
    const createRes = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${cashierToken}`)
      .send(validOrder());

    const orderId = createRes.body.data._id;

    const res = await request(app)
      .delete(`/api/order/${orderId}`)
      .set("Authorization", `Bearer ${cashierToken}`);

    expect(res.status).toBe(403);
  });
});
