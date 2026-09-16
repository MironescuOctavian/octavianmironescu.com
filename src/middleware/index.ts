import { construction } from "@rimelight/security/middleware"
import { sequence } from "astro/middleware"

export const onRequest = sequence(construction())
