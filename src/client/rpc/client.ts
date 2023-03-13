// import { AppRpc, SpecRpc } from "../../backend/rpc";
import { EntityEndpointRpc, SpecRpc } from "./interfaces";
import { RpcClientRequestContext } from "./request-context";
import { TrpcEntityEndpointRpc } from "./trpc/enitity-endpoint-rpc";
import { TrpcSpecRpc } from "./trpc/spec-rpc";

export interface RpcClientOptions {
  specUrl: string;
  appUrl: string;
}

export class RpcClient {

  private readonly _context: RpcClientRequestContext;

  readonly entityEndpoint: EntityEndpointRpc;
  // readonly binary: BinaryRpc;
  readonly spec: SpecRpc;
  
  constructor(options: RpcClientOptions) {
    this._context = {};

    this.entityEndpoint = new TrpcEntityEndpointRpc({
      url: options.appUrl,
      context: this._context,
    });
    
    this.spec = new TrpcSpecRpc({
      url: options.specUrl,
      context: this._context,
    });
  }

  setAuthentication(val?: string) {
    this._context.authentication = val;
  }
  
}

