import { z } from "zod";

export const TodoBaseSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),

  description: z.string().optional().nullable(),

  completed: z.boolean().optional(),

  created_at: z.date().optional(),
});

export const UpdateTodoSchema = TodoBaseSchema.partial()
  .omit({
    created_at: true, // prevent manual override
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  })
  .strict();

export const CreateTodoSchema = TodoBaseSchema.extend({
  title: TodoBaseSchema.shape.title, // required
})
  .omit({
    created_at: true, // handled by DB
  })
  .strict();

export const TodoIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});
