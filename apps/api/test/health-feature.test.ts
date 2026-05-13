import { assert, describe, it } from '@effect/vitest';
import { Effect } from 'effect';
import { makeHealthResponse, makeHealthRpcHandler } from '../src/features/health/health.js';

describe('health feature', () => {
  it('builds health response', () => {
    const health = makeHealthResponse('0.1.0');
    assert.strictEqual(health.status, 'ok');
    assert.strictEqual(health.service, 'api');
    assert.strictEqual(health.version, '0.1.0');
  });

  it.effect('exposes rpc health handler', () =>
    Effect.gen(function* () {
      const health = yield* makeHealthRpcHandler('0.1.0')();
      assert.strictEqual(health.status, 'ok');
      assert.strictEqual(health.service, 'api');
      assert.strictEqual(health.version, '0.1.0');
    }),
  );
});
