import { Hono } from "hono";
import { handleRequest } from "virtual:solid-ssr-handler";
import { security, devOnly, ratelimit, construction } from "@rimelight/security/middleware";
import { auth } from "@rimelight/auth/middleware";
import { cms } from "@rimelight/cms/middleware";
import { i18n } from "@rimelight/i18n/middleware";
import api from "#api";

const app = new Hono<{ Bindings: Env }>();

app.use(security());
app.use(devOnly);
app.use(
  ratelimit({
    routes: ["/auth/sign-in", "/auth/sign-up", "/api/upload", "/api/chat", "/api/contact"],
  }),
);
app.use(construction());
app.use(auth());
app.use(cms());

app.route("/api", api);
app.use(i18n());

app.all("*", (c) => handleRequest(c.req.raw));

export default {
  fetch: app.fetch,
};
