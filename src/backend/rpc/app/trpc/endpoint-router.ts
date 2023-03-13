import { initTRPC } from "@trpc/server";
import { ExecuteCommandOptions, ExecuteGlobalCommandOptions, GetEntityOptions, QueryReadEntitiesOptions, SuggestCommandInputOptions, SuggestGlobalCommandInputOptions } from "../interfaces/endpoint-handler";
import { TrpcRequestContext } from "./context";

export const t = initTRPC.context<TrpcRequestContext>().create();

export const trpcEntityEndpointRouter = t.router({
    queryReadEntities: t.procedure
        .input(QueryReadEntitiesOptions)
        .query(async ({ input, ctx }) => {
            return ctx.endpointHandler.queryReadEntities(input);
        }),
    getWriteEntity: t.procedure
        .input(GetEntityOptions)
        .query(({ input, ctx }) => {
            return ctx.endpointHandler.getEntity(input);
        }),
    executeCommand: t.procedure
        .input(ExecuteCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.endpointHandler.executeCommand(input);
        }),
    suggestCommandInput: t.procedure
        .input(SuggestCommandInputOptions)
        .query(({ input, ctx }) => {
            return ctx.endpointHandler.suggestCommandInput(input);
        }),
    executeGlobalCommand: t.procedure
        .input(ExecuteGlobalCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.endpointHandler.executeGlobalCommand(input);
        }),
    suggestGlobalCommandInput: t.procedure
        .input(SuggestGlobalCommandInputOptions)
        .query(({ input, ctx }) => {
            return ctx.endpointHandler.suggestGlobalCommandInput(input);
        })
});

export type TrpcEndpointRouter = typeof trpcEntityEndpointRouter;