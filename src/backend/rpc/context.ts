import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';
import { ServerHandlers } from "../sdk/server-handlers";

const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => {
    
    const getUser = () => {
        if (req.headers.authorization !== 'secret') {
            return null;
        }
        return {
            name: 'alex',
        };
    };

    const serverAdapter: ServerHandlers;
  
    return {
        req,
        res,
        user: getUser(),
        serverAdapter
    }
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();