import { t } from "./context";
import { ExecuteCommandOptions, ExecuteCreateCommandOptions, ExecuteGlobalCommandOptions, GetOptions, ListOptions, SuggestCommandInputOptions, SuggestGlobalCommandInputOptions } from "./endpoint-handler";

export const entityEndpointRouter = t.router({
    list: t.procedure
        .input(ListOptions)
        .query(async ({ input, ctx }) => {
            return ctx.entityEndpointHandler.list(input);
        }),
    get: t.procedure
        .input(GetOptions)
        .query(({ input, ctx }) => {
            return ctx.entityEndpointHandler.get(input);
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

export type EntityEndpointRouter = typeof entityEndpointRouter;