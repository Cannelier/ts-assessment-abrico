import { z } from 'zod';

export const zDocument = z.object({
    id: z.string().cuid(),
    createdAt: z.date(),
    updatedAt: z.date(),

    docType: z.string(),
    uri: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
})