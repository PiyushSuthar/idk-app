import { AuthRouter } from './routes/auth';
import { publicProcedure, router } from './trpc';

const appRouter = router({
	auth: AuthRouter,
	hello: publicProcedure.query(opts => {
		return { message: 'Hello World' };
	})
});

export type AppRouter = typeof appRouter;
