import { z } from "zod";
import { requiredString } from "./common.schema";

export const criteriaSchema = z.object({
  titleRu: requiredString,
  titleKg: requiredString,
  controlId: z
    .number()
    .min(1, "Заполните это поле"),
});

export type CriteriaFormValues = z.infer<typeof criteriaSchema>;