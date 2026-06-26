import { construction } from "@/middleware/construction.ts";
import { sequence } from "astro/middleware";

export const onRequest = sequence(construction);
