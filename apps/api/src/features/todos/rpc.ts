import { Effect } from 'effect';
import { HealthResponse, TodoRpcs } from '@template/shared';
import { TodoRepository } from './repository.js';

export const makeTodoRpcHandlers = (version: string) =>
  TodoRpcs.toLayer(
    Effect.gen(function* () {
      const repository = yield* TodoRepository;
      return TodoRpcs.of({
        health: () => Effect.succeed(new HealthResponse({ status: 'ok', service: 'api', version })),
        listTodos: () => repository.list,
        createTodo: (input) => repository.create(input),
        updateTodo: (input) => repository.update(input),
        deleteTodo: (input) => repository.remove(input),
      });
    }),
  );
