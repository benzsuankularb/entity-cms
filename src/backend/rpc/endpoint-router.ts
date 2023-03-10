import { t } from "./context";
import { ExecuteCommandOptions, ExecuteCreateCommandOptions, ExecuteListCommandOptions, GetWriteEntityOptions, QueryReadEntitiesOptions, SuggestCommandInputOptions, SuggestListCommandInputOptions } from "./endpoint-handler";

export const entityEndpointRouter = t.router({
    queryReadEntities: t.procedure
        .input(QueryReadEntitiesOptions)
        .query(async ({ input, ctx }) => {
            return ctx.entityEndpointHandler.queryReadEntities(input);
        }),
    getWriteEntity: t.procedure
        .input(GetWriteEntityOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.getWriteEntity(input);
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
    executeCreateCommand: t.procedure
        .input(ExecuteCreateCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.entityEndpointHandler.executeCreateCommand(input);
        }),
    executeListCommand: t.procedure
        .input(ExecuteListCommandOptions)
        .mutation(({ input, ctx }) => {
            return ctx.entityEndpointHandler.executeListCommand(input);
        }),
    suggestListCommandInput: t.procedure
        .input(SuggestListCommandInputOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.suggestListCommandInput(input);
        })
});

export type EntityEndpointRouter = typeof entityEndpointRouter;