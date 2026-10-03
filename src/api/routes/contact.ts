import { Hono, type MiddlewareHandler } from "hono";
import { z } from "zod";
import { env } from "cloudflare:workers";
import { turnstile } from "@rimelight/security/middleware";

const schema = z.object({
  name: z.string().trim().min(1).max(96),
  email: z.email().max(128),
  subject: z.string().trim().max(256).optional(),
  message: z.string().trim().min(10).max(5192),
});

export default new Hono().post("/", turnstile() as MiddlewareHandler, async (c) => {
  const { success, data, error } = schema.safeParse(await c.req.parseBody());
  if (!success) return c.json({ success: false as const, error: error.issues[0]?.message }, 400);

  const { name, email, subject, message } = data;
  const sent = await env.EMAIL.send({
    to: env.CONTACT_OWNER_EMAIL,
    from: `noreply@${env.EMAIL_DOMAIN}`,
    replyTo: { email, name },
    subject: `[Contact] ${subject || `Message from ${name}`}`.replace(/[\r\n]+/g, " "),
    text: `From: ${name} <${email}>\n\n${message}`,
  }).then(
    () => true,
    (err) => (console.error("[Contact] Failed to send message:", err), false),
  );

  if (!sent) return c.json({ success: false as const, error: "Could not send your message." }, 502);
  return c.json({ success: true as const });
});
