import { hc } from "hono/client"
import type { ApiType } from "#api"

export const api = hc<ApiType>("/api")
