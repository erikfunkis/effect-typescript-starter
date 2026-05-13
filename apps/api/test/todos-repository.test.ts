import { assert, describe, it } from '@effect/vitest';
import { SqliteClient } from '@effect/sql-sqlite-node';
import { Effect, Layer } from 'effect';
import { TodoRepository } from '../src/features/todos/repository.js';

const repositoryTestLayer = TodoRepository.layer.pipe(
  Layer.provide(SqliteClient.layer({ filename: ':memory:' })),
);

describe('todo repository', () => {
  it.effect('creates and lists todos', () =>
    Effect.gen(function* () {
      const repository = yield* TodoRepository;

      const created = yield* repository.create({ title: 'Write architecture doc' });
      assert.strictEqual(created.title, 'Write architecture doc');

      const todos = yield* repository.list;
      assert.strictEqual(todos.length, 1);
      assert.strictEqual(todos[0]?.id, created.id);
    }).pipe(Effect.provide(repositoryTestLayer)),
  );

  it.effect('updates and removes todos', () =>
    Effect.gen(function* () {
      const repository = yield* TodoRepository;
      const created = yield* repository.create({ title: 'Initial title' });

      const updated = yield* repository.update({
        id: created.id,
        title: 'Updated title',
        completed: true,
      });
      assert.strictEqual(updated.title, 'Updated title');
      assert.strictEqual(updated.completed, true);

      const removed = yield* repository.remove({ id: created.id });
      assert.strictEqual(removed.id, created.id);

      const remaining = yield* repository.list;
      assert.strictEqual(remaining.length, 0);
    }).pipe(Effect.provide(repositoryTestLayer)),
  );
});
