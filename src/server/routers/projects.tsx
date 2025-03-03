import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/config/trpc';
import { zProject } from '@/features/projects/schemas';

export const projectsRouter = createTRPCRouter({
  getProjectsForCurrentUser: publicProcedure()
    .meta({
      openapi: {
        method: 'GET',
        path: '/projects',
      },
    })
    .input(z.void())
    .output(z.array(zProject))
    .query(async ({ ctx }) => {
      //  If no current user: return empty list
      if (!ctx.user) {
        return [] 
      }

      // We fetch the projects associated to the user's company 
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
      })
      if (!user?.companyId) {
        throw new Error(`❌ No company was found for user ${ctx.user.id}`)
      }

      const company = await ctx.db.company.findFirst({
        where: { id: user?.companyId },
      })
      const projects = await ctx.db.project.findMany({
        where: { companyId: company?.id }
      })

      return projects?.map((project) => zProject.parse(project));
    }),
});
