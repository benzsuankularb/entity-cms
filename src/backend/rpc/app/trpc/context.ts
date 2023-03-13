import { inferAsyncReturnType } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';

export const createTrpcRequestContext = ({ req }: trpcExpress.CreateExpressContextOptions) => {
    return {
      endpointHandler: req.appRpc.endpointHandler,
      binaryHandler: req.appRpc.binaryHandler,
    };
};

export type TrpcRequestContext = inferAsyncReturnType<typeof createTrpcRequestContext>;