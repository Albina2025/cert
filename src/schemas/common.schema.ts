// import { z } from "zod";

// export const requiredString = z
//   .string()
//   .trim()
//   .min(1, "Заполните это поле")
//   .max(255, "Максимум 255 символов");

// export const optionalNumber = z.number().optional();

import { z } from "zod";

export const requiredString = z
  .string()
  .trim()
  .min(1, "Заполните это поле")
  .max(255, "Максимум 255 символов");

export const optionalString = z
  .string()
  .trim()
  .max(255, "Максимум 255 символов")
  .optional()
  .or(z.literal(""));

export const optionalNumber = z
  .union([
    z.number(),
    z.string().transform((v) => (v === "" ? undefined : Number(v))),
  ])
  .optional();