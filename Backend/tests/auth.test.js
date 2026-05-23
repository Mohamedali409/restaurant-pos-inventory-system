import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/modules/user/user.model.js";

const TEST_DB =
  process.env.TEST_MONGODB_URI ||
  "mongodb://localhost:27017/restaurantSystem_test";

beforeAll(async () => {
  await mongoose.connect(TEST_DB, { dbName: "restaurantSystem_test" });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
});

// ─── Register ───────────────────────────────────────────────────────────
describe("POST /api/auth/register", () => {
  const validUser = {
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  };

  it("should register a new user and return token", async () => {
    const res = await request(app).post("/api/auth/register").send(validUser);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user.password).toBeUndefined(); // password لازم يكون مخفي
  });

  it("should return 409 if email already exists", async () => {
    await request(app).post("/api/auth/register").send(validUser);
    const res = await request(app).post("/api/auth/register").send(validUser);

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it("should return 400 if name is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "a@b.com", password: "123456" });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it("should return 400 if email is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test", email: "not-an-email", password: "123456" });

    expect(res.status).toBe(400);
  });

  it("should return 400 if password is too short", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test", email: "a@b.com", password: "123" });

    expect(res.status).toBe(400);
  });

  it("should hash the password (not store plaintext)", async () => {
    await request(app).post("/api/auth/register").send(validUser);
    const user = await User.findOne({ email: validUser.email }).select(
      "+password",
    );

    expect(user.password).not.toBe(validUser.password);
    expect(user.password).toMatch(/^\$2b\$/); // bcrypt hash
  });
});

// ─── Login ───────────────────────────────────────────────────────────────
describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
      name: "Login User",
      email: "login@example.com",
      password: "password123",
    });
  });

  it("should login with correct credentials and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe("login@example.com");
    expect(res.body.user.password).toBeUndefined();
  });

  it("should return 401 with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "login@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("should return 401 with non-existent email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "notexist@example.com",
      password: "password123",
    });

    expect(res.status).toBe(401);
  });

  it("should return 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ password: "password123" });

    expect(res.status).toBe(400);
  });
});
