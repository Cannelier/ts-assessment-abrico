import { z } from 'zod';
import { zDocument } from '@/features/documents/schemas';

export type Operation = z.infer<typeof zOperation>;
export const zOperation = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),

  name: z.string().optional(),
  projectId: z.string(),
  ademeCode: z.string().optional(),
  documents: z.array(zDocument).optional(),
})