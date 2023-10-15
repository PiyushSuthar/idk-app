import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { db } from '../../db';
import { users } from '../../db/schemas/user';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const AuthRouter = router({
	login: publicProcedure
		.input(
			z.object({
				email: z.string(),
				password: z.string()
			})
		)
		.mutation(async opts => {
			const { email, password } = opts.input;

			const user = await db.select().from(users).where(eq(users.email, email));

			if (!user) {
				throw new TRPCError({
					message: 'User not found',
					code: 'UNAUTHORIZED'
				});
			}

			const isPasswordCorrect = await compare(password, user[0].password);

			if (!isPasswordCorrect) {
				throw new TRPCError({
					message: 'Password incorrect',
					code: 'UNAUTHORIZED'
				});
			}

			// TOKEN
			const token = jwt.sign(
				{ id: user[0].id, tokenVersion: user[0].tokenVersion },
				process.env.JWT_SECRET!
			);

			return { message: 'SUCCESS', token };
		}),
	register: publicProcedure
		.input(
			z.object({
				fullName: z.string(),
				email: z.string(),
				username: z.string(),
				password: z.string()
			})
		)
		.mutation(async opts => {
			const { fullName, email, username, password } = opts.input;

			const user = await db.select().from(users).where(eq(users.email, email));

			if (user) {
				throw new TRPCError({
					message: 'User already exists',
					code: 'UNAUTHORIZED'
				});
			}

			const hashedPassword = await hash(password, 12);

			const newUser = await db.insert(users).values({
				fullName,
				email,
				username,
				password: hashedPassword
			});

			return { message: 'SUCCESS' };
		})
});
