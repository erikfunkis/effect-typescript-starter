import { assert, describe, it } from '@effect/vitest';
import { SqliteClient } from '@effect/sql-sqlite-node';
import { Context, Effect, Layer } from 'effect';
import { RpcGroup } from 'effect/unstable/rpc';
import { RpcClient, RpcTest } from 'effect/unstable/rpc';
import type { RpcClientError } from 'effect/unstable/rpc/RpcClientError';
import { TodoRpcs } from '@template/shared';
import { makeRpcLayer } from '../src/application.js';

class TestApiClient extends Context.Service<
  TestApiClient,
  RpcClient.RpcClient<RpcGroup.Rpcs<typeof TodoRpcs>, RpcClientError>
>()('test/TestApiClient') {}

describe('api application layer', () => {
  it.effect('supports TodoRpcs via injected sqlite adapter', () => {
    const integrationLayer = Layer.effect(TestApiClient)(
      RpcTest.makeClient(TodoRpcs).pipe(Effect.orDie),
    ).pipe(
      Layer.provide(makeRpcLayer({ sqliteLayer: SqliteClient.layer({ filename: ':memory:' }) })),
    );

    return Effect.gen(function* () {
      const client = yield* TestApiClient;

      const health = yield* client.health();
      assert.strictEqual(health.status, 'ok');

      const created = yield* client.createTodo({ title: 'Probe application seam' });
      assert.strictEqual(created.title, 'Probe application seam');

      const listed = yield* client.listTodos();
      assert.strictEqual(listed.length, 1);
      assert.strictEqual(listed[0]?.id, created.id);
    }).pipe(Effect.provide(integrationLayer));
  });
});
