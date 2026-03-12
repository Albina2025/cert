import { z } from "zod";
import { requiredString, optionalNumber, optionalString } from "./common.schema";

export const privateSectorSchema = z.object({
  titleRu: requiredString,
  titleKg: requiredString,
  address: requiredString,
  logo: optionalString,
  parentId: optionalNumber,
});

export type PrivateSectorFormValues =
  z.infer<typeof privateSectorSchema>;