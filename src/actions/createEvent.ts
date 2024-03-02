"use server";

import * as z from "zod";
import { newEventSchema } from "@/validation";

export default async function createEvent(
  values: z.infer<typeof newEventSchema>
) {
  // const event = db.insert(values);
}
