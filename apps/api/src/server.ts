import { createServer } from "node:http"
import { Effect } from "effect"

const port = Number(process.env.API_PORT ?? 3000)

const healthResponse = Effect.succeed({
  status: "ok",
  service: "api",
  version: "0.1.0"
} as const)

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    const program = Effect.map(healthResponse, (payload) => {
      res.writeHead(200, { "content-type": "application/json" })
      res.end(JSON.stringify(payload))
    })

    Effect.runFork(program)
    return
  }

  res.writeHead(404, { "content-type": "application/json" })
  res.end(JSON.stringify({ error: "Not Found" }))
})

server.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`)
})
