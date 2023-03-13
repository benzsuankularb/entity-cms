import { initTRPC } from "@trpc/server";
import { ExecuteCommandOptions, ExecuteGlobalCommandOptions, GetEntityOptions, QueryReadEntitiesOptions, SuggestCommandInputOptions, SuggestGlobalCommandInputOptions } from "../interfaces/endpoint-handler";
import { TrpcRequestContext } from "../trpc/context";

export const t = initTRPC.context<TrpcRequestContext>().create();

export const trpcEntityEndpointRouter = t.router({
    queryReadEntities: t.procedure
        .input(QueryReadEntitiesOptions)
        .query(async ({ input, ctx }) => {
            return ctx.entityEndpointHandler.queryReadEntities(input);
        }),
    getWriteEntity: t.procedure
        .input(GetEntityOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.getEntity(input);
        }),
    executeCommand: t.procedure
        .input(ExecuteCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.entityEndpointHandler.executeCommand(input);
        }),
    suggestCommandInput: t.procedure
        .input(SuggestCommandInputOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.suggestCommandInput(input);
        }),
    executeGlobalCommand: t.procedure
        .input(ExecuteGlobalCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.entityEndpointHandler.executeGlobalCommand(input);
        }),
    suggestGlobalCommandInput: t.procedure
        .input(SuggestGlobalCommandInputOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.suggestGlobalCommandInput(input);
        })
});

export type EntityEndpointRouter = typeof trpcEntityEndpointRouter;