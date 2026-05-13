import { Effect } from 'effect';
import { ApiClient, makeApiClientLayer } from '@template/shared';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api';

const runWithClient = <A, E>(effect: Effect.Effect<A, E, ApiClient>) =>
  Effect.runPromise(effect.pipe(Effect.provide(makeApiClientLayer(apiBaseUrl))));

export const todoClient = {
  health: () =>
    runWithClient(
      Effect.gen(function* () {
        const client = yield* ApiClient;
        return yield* client.health();
      }),
    ),
  list: () =>
    runWithClient(
      Effect.gen(function* () {
        const client = yield* ApiClient;
        return yield* client.listTodos();
      }),
    ),
  create: (title: string) =>
    runWithClient(
      Effect.gen(function* () {
        const client = yield* ApiClient;
        return yield* client.createTodo({ title });
      }),
    ),
  toggle: (id: string, completed: boolean) =>
    runWithClient(
      Effect.gen(function* () {
        const client = yield* ApiClient;
        return yield* client.updateTodo({ id, completed });
      }),
    ),
  remove: (id: string) =>
    runWithClient(
      Effect.gen(function* () {
        const client = yield* ApiClient;
        return yield* client.deleteTodo({ id });
      }),
    ),
};
