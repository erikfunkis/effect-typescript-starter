import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { SqliteClient } from '@effect/sql-sqlite-node';
import { Effect, Layer } from 'effect';
import { HttpRouter, HttpServerResponse } from 'effect/unstable/http';
import { Reactivity } from 'effect/unstable/reactivity';
import { RpcServer, RpcSerialization } from 'effect/unstable/rpc';
import { mkdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { loadApiConfig } from '../../../packages/config/src/index.js';
import { TodoRpcs } from '@template/shared';
import { makeTodoRpcHandlers } from './features/todos/rpc.js';
import { TodoRepository } from './features/todos/repository.js';

const version = '0.1.0';

const TodoRpcHandlers = makeTodoRpcHandlers(version);

const TodoRpcServer = RpcServer.layer(TodoRpcs).pipe(Layer.provide(TodoRpcHandlers));

const RpcProtocol = RpcServer.layerProtocolHttp({ path: '/rpc' }).pipe(
  Layer.provide(HttpRouter.layer),
);
const HealthRoute = HttpRouter.add(
  'GET',
  '/health',
  Effect.succeed(HttpServerResponse.jsonUnsafe({ status: 'ok', service: 'api', version })),
);
const HttpRoutes = Layer.mergeAll(RpcProtocol, HealthRoute);

const config = await Effect.runPromise(loadApiConfig());
const configuredDbPath = config.todoDbPath.trim();
if (configuredDbPath !== ':memory:' && configuredDbPath.includes('/')) {
  mkdirSync(configuredDbPath.slice(0, configuredDbPath.lastIndexOf('/')), { recursive: true });
}
const sqliteLayer = SqliteClient.layer({ filename: configuredDbPath });

const AppLayer = TodoRpcServer.pipe(
  Layer.provideMerge(HttpRoutes),
  Layer.provide(HttpRouter.serve(HttpRoutes)),
  Layer.provide(HttpRouter.layer),
  Layer.provide(NodeHttpServer.layer(createServer, { port: config.port, host: config.host })),
  Layer.provide(TodoRepository.layer),
  Layer.provide(sqliteLayer),
  Layer.provide(Reactivity.layer),
  Layer.provide(RpcSerialization.layerNdjson),
);

Layer.launch(AppLayer).pipe(NodeRuntime.runMain);
