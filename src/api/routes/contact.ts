import { Hono } from "hono";
import { z } from "zod";
import { env } from "cloudflare:workers";
import { verifyTurnstile } from "@rimelight/security";

const schema = z.object({
  name: z.string().trim().min(1).max(96),
  email: z.email().max(128),
  subject: z.string().trim().max(256).optional(),
  message: z.string().trim().min(10).max(5192),
  "cf-turnstile-response": z.string().optional(),
});

export default new Hono().post("/", async (c) => {
  const parsed = schema.safeParse(await c.req.parseBody());
  if (!parsed.success) {
    return c.json({ success: false as const, error: parsed.error.issues[0]?.message }, 400);
  }

  const { name, email, subject, message, "cf-turnstile-response": token } = parsed.data;

  const botCheck = await verifyTurnstile({
    token,
    env,
    remoteIp: c.req.header("CF-Connecting-IP"),
  });
  if (!botCheck.success) {
    return c.json({ success: false as const, error: botCheck.error }, 400);
  }

  try {
    await env.EMAIL.send({
      to: env.CONTACT_OWNER_EMAIL,
      from: `noreply@${env.EMAIL_DOMAIN}`,
      replyTo: { email, name },
      subject: `[Contact] ${subject || `Message from ${name}`}`.replace(/[\r\n]+/g, " "),
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (err) {
    console.error("[Contact] Failed to send message:", err);
    return c.json(
      { success: false as const, error: "Could not send your message. Please try again later." },
      502,
    );
  }

  return c.json({ success: true as const });
});
