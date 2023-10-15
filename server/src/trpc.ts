import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { isAuth } from './middlewares/isAuth';

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuth);
