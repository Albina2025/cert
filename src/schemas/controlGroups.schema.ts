import { z } from "zod";
import { requiredString, optionalNumber } from "./common.schema";

export const controlGroupsSchema = z.object({
  titleRu: requiredString,
  titleKg: requiredString,
  identifier: requiredString,
  parentId: optionalNumber,
});

export type ControlGroupsFormValues =
  z.infer<typeof controlGroupsSchema>;