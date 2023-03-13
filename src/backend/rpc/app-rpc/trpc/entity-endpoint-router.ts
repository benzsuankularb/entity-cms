import { initTRPC } from "@trpc/server";
import { ExecuteCommandOptions, ExecuteGlobalCommandOptions, GetEntityOptions, QueryReadEntitiesOptions, SuggestCommandInputOptions, SuggestGlobalCommandInputOptions } from "../interfaces/entity-endpoint-handler";
import { TrpcRequestContext } from "./context";

export const t = initTRPC.context<TrpcRequestContext>().create();

export const trpcEntityEndpointRouter = t.router({
    queryReadEntities: t.procedure
        .input(QueryReadEntitiesOptions)
        .query(async ({ input, ctx }) => {
            return ctx.entityEndpointHandler.queryReadEntities(ctx.requestContext, input);
        }),
    getEntity: t.procedure
        .input(GetEntityOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.getEntity(ctx.requestContext, input);
        }),
    executeCommand: t.procedure
        .input(ExecuteCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.entityEndpointHandler.executeCommand(ctx.requestContext, input);
        }),
    suggestCommandInput: t.procedure
        .input(SuggestCommandInputOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.suggestCommandInput(ctx.requestContext, input);
        }),
    executeGlobalCommand: t.procedure
        .input(ExecuteGlobalCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.entityEndpointHandler.executeGlobalCommand(ctx.requestContext, input);
        }),
    suggestGlobalCommandInput: t.procedure
        .input(SuggestGlobalCommandInputOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.suggestGlobalCommandInput(ctx.requestContext, input);
        })
});

export type TrpcEntityEndpointRouter = typeof trpcEntityEndpointRouter;