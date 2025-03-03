import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/config/trpc';
import { zOperation } from '@/features/operations/schemas';
import { zDocument } from '@/features/documents/schemas';
import { getAttestationRgeForOperation } from '@/features/app-home/PageHome';

export const operationsRouter = createTRPCRouter({
  linkOperationsToDocuments: publicProcedure()
  .input(z.object({operationId: z.string(), documentId: z.string()}))
  .mutation(async ({ ctx, input }) => {
    const { operationId, documentId } = input;

    // Fetch the document with docType = "ATTESTATION_RGE"
    const oldDocument = await ctx.db.document.findFirst({
      where: { docType: "ATTESTATION_RGE",
        operations: {
          some: {
            id: operationId
          }
        }
       },
    });

    // Replace document or add new link
    if (oldDocument) {
      await ctx.db.operation.update({
        where: { id: operationId },
        data: {
          documents: {
            disconnect: { id: oldDocument.id }, // Disconnect the old document by its ID
            connect: { id: documentId }, // Connect the new document
          },
        },
      });
    } else {
      // If no existing document was found with docType "ATTESTATION_RGE", just link the new document
      await ctx.db.operation.update({
        where: { id: operationId },
        data: {
          documents: {
            connect: { id: documentId }, // Only connect the new document
          },
        },
      });
    }

    return { success: true };
  })
});
