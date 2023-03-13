
import { CreateTRPCProxyClient, createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import type { ExecuteCommand, ExecuteCommandOptions, ExecuteGlobalCommandOptions, ExecuteGlobalCommandResponse, GetEntityOptions, GetEntityResposne, QueryReadEntitiesOptions, QueryReadEntitiesResponse, SuggestCommandInputOptions, SuggestCommandInputResponse, SuggestGlobalCommandInputOptions, SuggestGlobalCommandInputResponse } from "../../../backend/rpc/app-rpc";
import type { TrpcEntityEndpointRouter } from "../../../backend/rpc/app-rpc/trpc";

import { EntityEndpointRpc } from "../interfaces";
import { RpcClientRequestContext } from "../request-context";

export interface TrpcEntityEndpointRpcOptions { url: string, context: RpcClientRequestContext }

export class TrpcEntityEndpointRpc implements EntityEndpointRpc {

    private readonly _router: CreateTRPCProxyClient<TrpcEntityEndpointRouter>;
    private readonly _context: RpcClientRequestContext;
    
    constructor(options: TrpcEntityEndpointRpcOptions) {
        this._context = options.context;
        this._router = createTRPCProxyClient<TrpcEntityEndpointRouter>({
            links: [
                httpBatchLink({
                    url: options.url
                }),
                // TODO add authentication link
            ]
        });
    }

    async queryReadEntities(options: QueryReadEntitiesOptions): Promise<QueryReadEntitiesResponse> {
        return this._router.queryReadEntities.query(options);
    }

    async getEntity(options: GetEntityOptions): Promise<GetEntityResposne> {
        return this._router.getEntity.query(options);
    }

    async executeGlobalCommand(options: ExecuteGlobalCommandOptions): Promise<ExecuteGlobalCommandResponse> {
        return this._router.executeGlobalCommand.mutate(options);
    }

    async suggestGlobalCommandInput(options: SuggestGlobalCommandInputOptions): Promise<SuggestGlobalCommandInputResponse> {
        return this._router.suggestGlobalCommandInput.query(options);
    }

    async executeCommand(options: ExecuteCommandOptions): Promise<ExecuteCommand> {
        return this._router.executeCommand.mutate(options);
    }

    async suggestCommandInput(options: SuggestCommandInputOptions): Promise<SuggestCommandInputResponse> {
        return this._router.suggestCommandInput.query(options);
    }

}