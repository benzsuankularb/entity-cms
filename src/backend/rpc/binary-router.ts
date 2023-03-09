import { ListOptions } from "../sdk/endpoint-handler";
import { t } from "./context";

const binaryRouter = t.router({
    list: t.procedure
        .input(ListOptions)
        .query(async ({ input, ctx }) => {
            const handler = ctx.serverAdapter.getEntityEndpointHandler(input.endpoint);
            if (!handler) {
                throw 'handler not found'; //TODO
            }
            return handler.list(input);
        }),
});