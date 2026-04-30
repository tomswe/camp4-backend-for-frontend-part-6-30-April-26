import { todoRepo } from "./todoRepo.js";
import { CreateTodoSchema, UpdateTodoSchema } from "./todoValidation.js";

export const todoService = {
  async create(data) {
    const parsed = CreateTodoSchema.parse(data);
    return await todoRepo.create(parsed);
  },

  async getAll() {
    return await todoRepo.findAll();
  },

  async getById(id) {
    const todo = await todoRepo.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  },

  async update(id, data) {
    const parsed = UpdateTodoSchema.parse(data);

    const existing = await todoRepo.findById(id);
    if (!existing) {
      throw new Error("Todo not found");
    }

    const updated = await todoRepo.update(id, parsed);
    return updated;
  },

  async delete(id) {
    const existing = await todoRepo.findById(id);
    if (!existing) {
      throw new Error("Todo not found");
    }

    return await todoRepo.delete(id);
  },
};
