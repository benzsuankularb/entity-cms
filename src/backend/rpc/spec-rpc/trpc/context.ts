import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

export const createTrpcRequestContext = ({ req }: trpcExpress.CreateExpressContextOptions) => {
    return {
      specHandler: req.specRpc.specHandler,
      requestContext: {} //TODO RpcReqeustContext
    };
};

export type TrpcRequestContext = inferAsyncReturnType<typeof createTrpcRequestContext>;