import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schemas/*.ts",
    out: "./src/db/generated",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    }
} satisfies Config;