import { Effect } from "effect"
import { ApiClient, makeApiClientLayer } from "@template/shared"

const healthElement = document.querySelector<HTMLParagraphElement>("#health-status")

if (!healthElement) {
  throw new Error("Missing #health-status element")
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api"

const render = (message: string) => {
  healthElement.textContent = message
}

const program = Effect.gen(function*() {
  const client = yield* ApiClient
  return yield* client.health()
}).pipe(
  Effect.provide(makeApiClientLayer(apiBaseUrl))
)

const run = async () => {
  try {
    const health = await Effect.runPromise(program)
    render(`API healthy: ${health.service} ${health.version}`)
  } catch (error) {
    render(`API unreachable: ${error instanceof Error ? error.message : String(error)}`)
  }
}

void run()
