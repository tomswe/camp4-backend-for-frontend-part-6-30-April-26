import { todoService } from "./todoService.js";
import { TodoIdSchema } from "./todoValidation.js";

export const todoController = {
  async create(req, res) {
    try {
      const todo = await todoService.create(req.body);
      res.status(201).json(todo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const todos = await todoService.getAll();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = TodoIdSchema.parse(req.params);
      const todo = await todoService.getById(id);
      res.json(todo);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = TodoIdSchema.parse(req.params);
      const todo = await todoService.update(id, req.body);
      res.json(todo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = TodoIdSchema.parse(req.params);
      await todoService.delete(id);
      res.json({ message: "Todo deleted successfully" });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },
};
