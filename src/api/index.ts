import { Hono } from "hono"

const api = new Hono()
  .get("/health", (c) => {
    return c.json({ status: "ok", timestamp: new Date().toISOString() })
  })
  .get("/", (c) => {
    return c.json({ name: "octavianmironescu.com API", status: "online" })
  })

export type ApiType = typeof api
export default api
