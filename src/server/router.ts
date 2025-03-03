import { createTRPCRouter } from '@/server/config/trpc';
import { authRouter } from '@/server/routers/auth';
import { projectsRouter } from '@/server/routers/projects';
import { documentsRouter } from '@/server/routers/documents';

/**
 * This is the primary router for your server.
 *
 * All routers added in /src/server/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  projects: projectsRouter,
  documents: documentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
