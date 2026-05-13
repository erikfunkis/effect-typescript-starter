import { Schema } from 'effect';
import { Todo } from '@template/shared';

export type TodoRow = {
  readonly id: string;
  readonly title: string;
  readonly completed: number;
  readonly created_at: string;
  readonly updated_at: string;
};

const decodeTodo = Schema.decodeUnknownSync(Todo);

export const mapRowToTodo = (row: TodoRow) =>
  decodeTodo({
    id: row.id,
    title: row.title,
    completed: row.completed === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
