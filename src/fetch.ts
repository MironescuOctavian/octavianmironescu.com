import { Hono } from "hono";
import { handleRequest } from "virtual:solid-ssr-handler";
import { security, devOnly, ratelimit, construction } from "@rimelight/security/middleware";
import { auth } from "@rimelight/auth/middleware";
import { i18n } from "@rimelight/i18n/middleware";
import api from "#api";

const app = new Hono<{ Bindings: Env }>();

app.use(security());
app.use(devOnly);
app.use(ratelimit());
app.use(construction());
app.use(auth());

app.route("/api", api);
app.use(i18n());

app.all("*", (c) => handleRequest(c.req.raw));

export default {
  fetch: app.fetch,
};
