import { Hono } from "hono"

const api = new Hono()

api.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() })
})

api.get("/", (c) => {
  return c.json({ name: "octavianmironescu.com API", status: "online" })
})

export default api
