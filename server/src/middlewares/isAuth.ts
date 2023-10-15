import { TRPCError } from '@trpc/server';
import { t } from '../trpc';

export const isAuth = t.middleware(({ ctx, next }) => {
	if (!ctx.payload) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Not authenticated'
		});
	}

	return next({
		ctx: {
			user: ctx.payload.user
		}
	});
});
