import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

async function main() {
	try {
		console.log('Migrating database...');
		const queryClient = postgres(process.env.DATABASE_URL!, {
			max: 1
		});

		const db: PostgresJsDatabase = drizzle(queryClient);

		await migrate(db, {
			migrationsFolder: './src/db/migrations'
		});
	} catch (error) {
		console.error('Error migrating database:');
		console.error(error);
		process.exit(1);
	}
}
