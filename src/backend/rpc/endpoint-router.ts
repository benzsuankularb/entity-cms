import { ExecuteCommandOptions, ExecuteCreateCommandOptions, ExecuteGlobalCommandOptions, GetOptions, ListOptions, SuggestCommandInputOptions, SuggestGlobalCommandInputOptions } from "../sdk/endpoint-handler";
import { t } from "./context";

export const entityEndpointRouter = t.router({
    list: t.procedure
        .input(ListOptions)
        .query(async ({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.list(input);
        }),
    get: t.procedure
        .input(GetOptions)
        .query(({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.get(input);
        }),
    executeCommand: t.procedure
        .input(ExecuteCommandOptions)
        .mutation(({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.executeCommand(input);
        }),
    suggestCommandInput: t.procedure
        .input(SuggestCommandInputOptions)
        .mutation(({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.suggestCommandInput(input);
        }),
    executeCreateCommand: t.procedure
        .input(ExecuteCreateCommandOptions)
        .mutation(({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.executeCreateCommand(input);
        }),
    executeGlobalCommand: t.procedure
        .input(ExecuteGlobalCommandOptions)
        .mutation(({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.executeGlobalCommand(input);
        }),
    suggestGlobalCommandInput: t.procedure
        .input(SuggestGlobalCommandInputOptions)
        .mutation(({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.suggestGlobalCommandInput(input);
        })
});

export type EntityEndpointRouter = typeof entityEndpointRouter;