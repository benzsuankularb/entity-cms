import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

export const createTrpcRequestContext = ({ req }: trpcExpress.CreateExpressContextOptions) => {
    return {
      entityEndpointHandler: req.appRpc.entityEndpointHandler,
      binaryHandler: req.appRpc.binaryHandler,
      requestContext: {}, //TODO RpcRequestContext
    };
};

export type TrpcRequestContext = inferAsyncReturnType<typeof createTrpcRequestContext>;