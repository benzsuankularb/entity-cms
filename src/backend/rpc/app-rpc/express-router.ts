import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import { expressBinaryRouter } from './express/binary-router';
import { RpcBinaryHandler, RpcEntityEndpointHandler } from './interfaces';
import { createTrpcRequestContext, trpcEntityEndpointRouter } from './trpc';


export const createExpressRouter = (options: {
    endpointHandler: RpcEntityEndpointHandler,
    binaryHandler: RpcBinaryHandler,
}) => {

    const router = express.Router();
    
    // prepare request context & dependencies
    router.use(async (req: express.Request, _: express.Response, next: express.NextFunction) => {
        req.appRpc = {
            entityEndpointHandler: options.endpointHandler,
            binaryHandler: options.binaryHandler,
            requestContext: {} //TODO
        }
        next();
    });

    router.use('/endpoints', trpcExpress.createExpressMiddleware({
        router: trpcEntityEndpointRouter,
        createContext: createTrpcRequestContext,
      })
    );

    router.use('/binaries', expressBinaryRouter);
    
    return router;
};