import { z } from 'zod';
import { zOperation } from '@/features/operations/schemas';

export const zProject = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),

  signedAt: z.date().optional(),
  companyId: z.string().cuid(),
  operations: z.array(zOperation).optional(),
})