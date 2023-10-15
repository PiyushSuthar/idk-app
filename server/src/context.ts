import * as trpc from '@trpc/server';
import type { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
// import { compare } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { User } from './db/schemas/user';

export type Payload = {
	user: User;
	tokenVersion: number;
};

export async function createContext({
	req,
	res
}: trpcNext.CreateNextContextOptions) {
	const token = req.headers.authorization?.split(' ')[1] ?? null;
	const payload: Payload | null = token
		? (verify(token, process.env.JWT_SECRET!) as Payload)
		: null;

	return {
		req,
		res,
		payload
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
