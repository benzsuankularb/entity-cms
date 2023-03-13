import { initTRPC } from "@trpc/server";
import { GetSpecOptions } from "../interfaces";
import { TrpcRequestContext } from "./context";

export const t = initTRPC.context<TrpcRequestContext>().create();

export const trpcSpecRouter = t.router({
    getSpec: t.procedure
        .input(GetSpecOptions)
        .query(async ({ input, ctx }) => {
            return ctx.specHandler.getSpec(ctx.requestContext, input);
        })
});

export type TrpcSpecRouter = typeof trpcSpecRouter;