import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/config/trpc';
import { zDocument } from '@/features/documents/schemas';

export const documentsRouter = createTRPCRouter({
  getDocumentsForCurrentUser: publicProcedure()
    .meta({
      openapi: {
        method: 'GET',
        path: '/documents',
      },
    })
    .input(z.void())
    .output(z.array(zDocument))
    .query(async ({ ctx }) => {
      //  If no current user: return empty list
      if (!ctx.user) {
        return [] 
      }

      // We fetch the document uploaded by a User
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
      })

      const documents = await ctx.db.document.findMany({
        where: { uploadedById: user?.id },
      })
      
      return documents?.map((document) => zDocument.parse(document));
    }),
});
