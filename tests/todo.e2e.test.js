import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("Todo API (E2E)", () => {
  let createdId;

  it("POST /api/todos", async () => {
    const res = await request(app)
      .post("/api/todos")
      .send({ title: "E2E Test" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("E2E Test");

    createdId = res.body.id;
  });

  it("GET /api/todos/:id", async () => {
    const res = await request(app).get(`/api/todos/${createdId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  it("PUT /api/todos/:id", async () => {
    const res = await request(app)
      .put(`/api/todos/${createdId}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("DELETE /api/todos/:id", async () => {
    const res = await request(app).delete(`/api/todos/${createdId}`);

    expect(res.status).toBe(200);
  });
});
