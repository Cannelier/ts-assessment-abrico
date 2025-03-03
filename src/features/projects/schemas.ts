import { z } from 'zod';

export const zProject = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),

  signedAt: z.date().optional(),
  companyId: z.string().cuid(),
  // operations
})