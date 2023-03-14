import type { EntityCmsSpec, GetSpecOptions } from '../../../backend/rpc/spec-rpc';
import type { TrpcSpecRouter } from '../../../backend/rpc/spec-rpc/trpc';

import { createTRPCProxyClient, CreateTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { RpcClientContext } from '../context';
import { SpecRpc } from '../interfaces';

export interface TrpcSpecRpcOptions { url: string, context: RpcClientContext }

export class TrpcSpecRpc implements SpecRpc {

    private readonly _router: CreateTRPCProxyClient<TrpcSpecRouter>;
    private readonly _context: RpcClientContext;
    
    constructor(options: TrpcSpecRpcOptions) {
        this._context = options.context;
        this._router = createTRPCProxyClient<TrpcSpecRouter>({
            links: [
                httpBatchLink({
                    url: options.url
                }),
                // TODO add authentication link
            ]
        });
    }
    
    async getSpec(options: GetSpecOptions): Promise<EntityCmsSpec> {
        return this._router.getSpec.query(options);
    }
    
}