import { z } from 'zod';

export const zOperation = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string().optional(),
  projectId: z.string(),
  ademeCode: z.string().optional()
  // documents
})