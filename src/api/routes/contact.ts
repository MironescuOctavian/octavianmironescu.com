import { Hono } from "hono";
import { z } from "zod";

export interface ContactEnv {
  EMAIL: SendEmail;
  CONTACT_OWNER_EMAIL: string;
}

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(96),
  email: z.email("Invalid email address").max(128),
  subject: z.string().trim().max(256).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5192),
});

export default new Hono<{ Bindings: ContactEnv }>().post("/", async (c) => {
  const { success, data, error } = schema.safeParse(await c.req.parseBody());
  if (!success) return c.json({ success: false as const, error: error.issues[0]?.message }, 400);

  const { name, email, subject, message } = data;
  const sent = await c.env.EMAIL.send({
    to: c.env.CONTACT_OWNER_EMAIL,
    from: `noreply@${c.env.CONTACT_OWNER_EMAIL.split("@")[1]}`,
    replyTo: { email, name },
    subject: `[Contact] ${subject || `Message from ${name}`}`.replace(/[\r\n]+/g, " "),
    text: `From: ${name} <${email}>\n\n${message}`,
  }).then(
    () => true,
    (err: unknown) => (console.error("[Contact] Failed to send message:", err), false),
  );

  if (!sent) return c.json({ success: false as const, error: "Could not send your message." }, 502);
  return c.json({ success: true as const });
});
