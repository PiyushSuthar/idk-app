import { publicProcedure, router } from "./trpc";

const appRouter = router({
    hello: publicProcedure.query((opts) => {
        return { message: "Hello World" }
    })
})

export type AppRouter = typeof appRouter;