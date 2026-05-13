import { Effect } from 'effect';
import { HealthResponse, TodoRpcs } from '@template/shared';
import { TodoRepository } from './repository.js';

export const makeTodoRpcHandlers = (health: () => Effect.Effect<HealthResponse>) =>
  TodoRpcs.toLayer(
    Effect.gen(function* () {
      const repository = yield* TodoRepository;
      return TodoRpcs.of({
        health,
        listTodos: () => repository.list,
        createTodo: (input) => repository.create(input),
        updateTodo: (input) => repository.update(input),
        deleteTodo: (input) => repository.remove(input),
      });
    }),
  );
