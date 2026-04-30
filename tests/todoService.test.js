import { describe, it, expect, vi, beforeEach } from "vitest";
import { todoService } from "../src/modules/todo/todoService.js";
import { todoRepo } from "../src/modules/todo/todoRepo.js";

// mock repo
vi.mock("../src/modules/todo/todoRepo.js", () => ({
  todoRepo: {
    create: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("todoService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create todo", async () => {
    const mockTodo = { id: 1, title: "Test", completed: false };

    todoRepo.create.mockResolvedValue(mockTodo);

    const result = await todoService.create({
      title: "Test",
    });

    expect(result).toEqual(mockTodo);
    expect(todoRepo.create).toHaveBeenCalled();
  });

  it("should throw if todo not found", async () => {
    todoRepo.findById.mockResolvedValue(null);

    await expect(todoService.getById(1)).rejects.toThrow("Todo not found");
  });

  it("should update todo", async () => {
    const existing = { id: 1, title: "Old" };
    const updated = { id: 1, title: "New" };

    todoRepo.findById.mockResolvedValue(existing);
    todoRepo.update.mockResolvedValue(updated);

    const result = await todoService.update(1, {
      title: "New",
    });

    expect(result.title).toBe("New");
  });

  it("should get all todos", async () => {
    const mockTodos = [
      { id: 1, title: "Test1" },
      { id: 2, title: "Test2" },
    ];

    todoRepo.findAll.mockResolvedValue(mockTodos);

    const result = await todoService.getAll();

    expect(result).toEqual(mockTodos);
    expect(todoRepo.findAll).toHaveBeenCalled();
  });
});
