import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/db/schemas/*.ts',
	out: './src/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DATABASE_URL!
	},
	verbose: true,
	strict: true
} satisfies Config;
