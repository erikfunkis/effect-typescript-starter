import { Context, flow, Layer, Schedule } from "effect"
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/unstable/http"
import { HttpApiClient } from "effect/unstable/httpapi"
import { Api } from "./api.js"

export class ApiClient extends Context.Service<ApiClient, HttpApiClient.ForApi<typeof Api>>()("template/ApiClient") {}

export const makeApiClientLayer = (baseUrl: string) =>
  Layer.effect(
    ApiClient,
    HttpApiClient.make(Api, {
      transformClient: (client) =>
        client.pipe(
          HttpClient.mapRequest(flow(
            HttpClientRequest.prependUrl(baseUrl)
          )),
          HttpClient.retryTransient({
            schedule: Schedule.exponential(100),
            times: 3
          })
        )
    })
  ).pipe(
    Layer.provide(FetchHttpClient.layer)
  )
