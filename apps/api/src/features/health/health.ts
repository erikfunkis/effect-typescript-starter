import { Effect } from 'effect';
import { HttpRouter, HttpServerResponse } from 'effect/unstable/http';
import { HealthResponse } from '@template/shared';

export const makeHealthResponse = (version: string) =>
  new HealthResponse({ status: 'ok', service: 'api', version });

export const makeHealthRpcHandler = (version: string) => () =>
  Effect.succeed(makeHealthResponse(version));

export const makeHealthRoute = (version: string) =>
  HttpRouter.add(
    'GET',
    '/health',
    Effect.succeed(HttpServerResponse.jsonUnsafe(makeHealthResponse(version))),
  );
