const port = Number(process.env.API_PORT ?? 3000)
const url = `http://127.0.0.1:${port}/health`

const response = await fetch(url)
if (!response.ok) {
  throw new Error(`Smoke check failed: expected 200, got ${response.status}`)
}

const body = await response.json() as {
  status?: string
  service?: string
  version?: string
}

if (body.status !== "ok" || body.service !== "api" || body.version !== "0.1.0") {
  throw new Error(`Smoke check failed: unexpected payload ${JSON.stringify(body)}`)
}

console.log("[smoke] /health OK")
