import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from '@trpc/server/adapters/express';
import { EntityEndpointHandler } from "./endpoint-handler";

const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions) => {
    let entityEndpointHandler: EntityEndpointHandler;
    return {
      req,
      res,
      entityEndpointHandler
    };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

