import { Hono } from "hono";
import { handleRequest } from "virtual:solid-ssr-handler";
import { security, devOnly, ratelimit, construction } from "@rimelight/security/middleware";
import { auth } from "@rimelight/auth/middleware";
import { i18n } from "@rimelight/i18n/middleware";
import { getRelativeLocaleUrl } from "@rimelight/i18n";
import api from "#api";

const app = new Hono<{ Bindings: Env }>();

app.use(security());
app.use(devOnly);
app.use(ratelimit());
app.use(construction());
app.use(
  auth({
    roleGuards: {
      "/admin": ["admin", "owner"],
    },
  }),
);

app.route("/api", api);
app.use(i18n());

app.onError((err, c) => {
  console.error("[Hono Server Error]", err);
  const isHtml = (c.req.header("accept") || "").includes("text/html");
  if (isHtml) {
    return c.redirect(getRelativeLocaleUrl("/500"), 302);
  }
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

// Fall through all unmatched requests to Solid's SSR page renderer
app.all("*", (c) => handleRequest(c.req.raw));

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return Promise.resolve(app.fetch(request, env, ctx));
  },
};
