import * as express from 'express';

export const createContext = ({ req, res }: CreateContextOptions) => {
    return {
        a: 1,
        b: 2
    }
}

type ContextType = Awaited<ReturnType<typeof createContext>>

type CreateContextOptions = {
    req: express.Request,
    res: express.Response
}

function createEntityCMSServer<TContext>(createContext: (options: CreateContextOptions) => TContext) {
    // 
}

interface CMSContext<TContext> {
    writeEntitySections(): this;
    readEntityPayloads()
}

interface CMSContext<TContext> {
    writeEntitySections(): this;
    readEntityPayloads()
}