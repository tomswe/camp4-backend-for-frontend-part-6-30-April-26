import express from "express";
import { todoController } from "./todoController.js";

const router = express.Router();

router.post("/", todoController.create);
router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.delete);

export default router;
