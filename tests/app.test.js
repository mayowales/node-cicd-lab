const request = require("supertest");
const app = require("../src/app");

describe("GET /api/users", () => {
  it("should return all users with status 200", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it("should return users filtered by role", async () => {
    const res = await request(app).get("/api/users?role=admin");
    expect(res.statusCode).toBe(200);
    res.body.forEach((user) => {
      expect(user.role).toBe("admin");
    });
  });

  it("should return users filtered by role and active status", async () => {
    const res = await request(app).get("/api/users?role=admin&status=active");
    expect(res.statusCode).toBe(200);
    res.body.forEach((user) => {
      expect(user.role).toBe("admin");
      expect(user.active).toBe(true);
    });
  });

  it("should return 404 when no users match the filter", async () => {
    const res = await request(app).get("/api/users?role=nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "No users found");
  });
});

describe("GET /api/users/:id", () => {
  it("should return a single user by ID", async () => {
    const res = await request(app).get("/api/users/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
  });

  it("should return 404 for a non-existent user", async () => {
    const res = await request(app).get("/api/users/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "User not found");
  });

  it("should handle non-numeric ID gracefully", async () => {
    const res = await request(app).get("/api/users/abc");
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /api/users", () => {
  it("should create a new user and return 201", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ name: "Charlie", email: "charlie@example.com" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name", "Charlie");
    expect(res.body).toHaveProperty("email", "charlie@example.com");
    expect(res.body).toHaveProperty("role", "user");
    expect(res.body).toHaveProperty("active", true);
  });

  it("should return 400 when name is missing", async () => {
    const res = await request(app)
      .post("/api/users")
      .send({ email: "noname@example.com" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Name and email are required");
  });

  it("should return 400 when email is missing", async () => {
    const res = await request(app).post("/api/users").send({ name: "NoEmail" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should return 400 when body is empty", async () => {
    const res = await request(app).post("/api/users").send({});
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /api/login", () => {
  it("should return a token for valid login", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "alice@example.com" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return 400 when email is missing", async () => {
    const res = await request(app).post("/api/login").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Email is required");
  });
});
