import { db } from "../../config/db.js";

export const todoRepo = {
  async create({ title, description, completed }) {
    const result = await db.query(
      `INSERT INTO todos (title, description, completed)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description ?? null, completed ?? false],
    );

    return result.rows[0];
  },

  async findAll() {
    const result = await db.query(
      `SELECT * FROM todos ORDER BY created_at DESC`,
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(`SELECT * FROM todos WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async update(id, fields) {
    const keys = Object.keys(fields);

    if (keys.length === 0) return null;

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");

    const values = Object.values(fields);

    const result = await db.query(
      `UPDATE todos
       SET ${setClause}
       WHERE id = $${keys.length + 1}
       RETURNING *`,
      [...values, id],
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await db.query(
      `DELETE FROM todos WHERE id = $1 RETURNING *`,
      [id],
    );
    return result.rows[0];
  },
};
