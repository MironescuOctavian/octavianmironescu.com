import { hc } from "hono/client";
import type { ApiType } from "#api/server";

export const api = hc<ApiType>("/api");
