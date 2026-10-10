import { Hono } from "hono";
import { handleRequest } from "virtual:solid-ssr-handler";
import { security } from "@rimelight/security/middleware";
import { auth } from "@rimelight/auth/middleware";
import { cms } from "@rimelight/cms/middleware";
import { i18n } from "@rimelight/i18n/middleware";
import api from "#api/server";

const app = new Hono<{ Bindings: Env }>();

app.use(security());
app.use(auth());
app.use(cms());

app.route("/api", api);
app.use(i18n());

app.all("*", (c) => handleRequest(c.req.raw));

export default {
  fetch: app.fetch,
};
