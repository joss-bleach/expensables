import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  perDiemAmount: z.number().min(1).default(50),
  restDays: z.number().min(0).default(0),
});
