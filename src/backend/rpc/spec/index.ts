import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import { RpcSpecHandler } from './interfaces';
import { createTrpcRequestContext, trpcSpecRouter } from './trpc';

export const createExpressRouter = (options: {
    specHandler: RpcSpecHandler
}) => {

    const router = express.Router();
    
    const injectDependencies = async (req: express.Request, _: express.Response, next: express.NextFunction) => {
        req.specRpc.specHandler = options.specHandler;
        next();
    }

    router.use(injectDependencies);

    router.use('/', trpcExpress.createExpressMiddleware({
        router: trpcSpecRouter,
        createContext: createTrpcRequestContext,
      })
    );
    
    return router;
};

export const createExpressServer = (options: {
    specHandler: RpcSpecHandler;
    port?: string;
}) => {
    const app = express();
    
    app.use(
        createExpressRouter({
            specHandler: options.specHandler,
        })
    );
    
    const port = options?.port ?? 3001;
    
    app.listen(port, () => {
        console.log(`EntityCMS RPC server is started at :${port}`);
    });
}