import { jest } from "@jest/globals";
jest.setTimeout(90000); // longer timeout for integration tests

import request from "supertest";
import { startTestServer, stopTestServer } from "../../testServer.js";

let httpServer;

beforeAll(async () => {
  httpServer = await startTestServer();
});

afterAll(async () => {
  await stopTestServer();
});

describe("Todo API Integration Tests", () => {
  let createdTodoId;

  // CREATE
  test("POST /api/add-todo should create a new todo", async () => {
    const newTodo = { text: "Test Todo", completed: false };
    const res = await request(httpServer).post("/api/add-todo").send(newTodo);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.text).toBe(newTodo.text);

    createdTodoId = res.body._id; // save for later tests
  });

  // READ
  test("GET /api/todos should return all todos", async () => {
    const res = await request(httpServer).get("/api/todos");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // UPDATE
  test("PUT /api/todos/:id should update a todo", async () => {
    const updateData = { text: "Updated Todo", completed: true };
    const res = await request(httpServer)
      .put(`/api/todos/${createdTodoId}`)
      .send(updateData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", createdTodoId);
    expect(res.body.text).toBe(updateData.text);
    expect(res.body.completed).toBe(true);
  });

  // DELETE
  test("DELETE /api/todos/:id should delete a todo", async () => {
    const res = await request(httpServer).delete(`/api/todos/${createdTodoId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");

    // confirm it’s deleted
    const getRes = await request(httpServer).get("/api/todos");
    const deleted = getRes.body.find((t) => t._id === createdTodoId);
    expect(deleted).toBeUndefined();
  });
});
