import { t } from '../trpc';

export const isAuth = t.middleware(({ ctx, next }) => {
	if (!ctx.payload) {
		throw new Error('not authenticated');
	}

	return next({
		ctx: {
			user: ctx.payload.user
		}
	});
});
