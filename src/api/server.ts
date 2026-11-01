import { Hono } from "hono";
import contactRoutes from "./routes/contact";

const api = new Hono().route("/contact", contactRoutes);

export type ApiType = typeof api;
export default api;
