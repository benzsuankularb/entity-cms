import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import { RpcBinaryHandler, RpcEntityEndpointHandler } from './interfaces';
import { createTrpcRequestContext, trpcEntityEndpointRouter } from './trpc';


export const createExpressRouter = (options: {
    endpointHandler: RpcEntityEndpointHandler,
    binaryHandler: RpcBinaryHandler,
}) => {

    const router = express.Router();
    
    const injectDependencies = async (req: express.Request, _: express.Response, next: express.NextFunction) => {
        req.appRpc.endpointHandler = options.endpointHandler;
        req.appRpc.binaryHandler = options.binaryHandler;
        next();
    }

    router.use(injectDependencies);

    router.use('/endpoints', trpcExpress.createExpressMiddleware({
        router: trpcEntityEndpointRouter,
        createContext: createTrpcRequestContext,
      })
    );

    // router.use('/binaries', injectDependencies, trpcExpress.createExpressMiddleware({
    //     router: trpcEntityEndpointRouter,
    //     createContext: createTrpcRequestContext,
    //   })
    // );
    
    return router;
};

export const createExpressServer = (options: {
    endpointHandler: RpcEntityEndpointHandler,
    binaryHandler: RpcBinaryHandler,
    port?: string
}) => {
    const app = express();
    
    app.use(
        createExpressRouter({
            binaryHandler: options.binaryHandler,
            endpointHandler: options.endpointHandler,
        })
    );
    
    const port = options?.port ?? 3000;
    
    app.listen(port, () => {
        console.log(`EntityCMS RPC server is started at :${port}`);
    });
}