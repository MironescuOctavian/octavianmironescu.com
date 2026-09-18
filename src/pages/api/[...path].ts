import api from "#api"
import { type APIContext } from "astro"

export async function ALL({ request, params }: APIContext) {
  const path = "/" + (params["path"] || "")
  const url = new URL(request.url)
  url.pathname = path

  const init: RequestInit = {
    method: request.method,
    headers: request.headers
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text()
  }

  const modifiedRequest = new Request(url, init)

  const response = await api.request(modifiedRequest)
  return response
}
