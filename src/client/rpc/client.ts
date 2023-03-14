// import { AppRpc, SpecRpc } from "../../backend/rpc";
import { RpcClientContext } from "./context";
import { HttpBinaryRpc } from "./http/binary-rpc";
import { BinaryRpc, EntityEndpointRpc, SpecRpc } from "./interfaces";
import { TrpcEntityEndpointRpc } from "./trpc/enitity-endpoint-rpc";
import { TrpcSpecRpc } from "./trpc/spec-rpc";


export interface AppRpc {
  binary: BinaryRpc;
  entityEndpoint: EntityEndpointRpc;
}

export class RpcClient {

  private readonly _context: RpcClientContext;
  
  constructor() {
    this._context = {};
  }

  setAuthentication(val?: string) {
    this._context.authentication = val;
  }
  
  spec(url: string): SpecRpc {
    return new TrpcSpecRpc({
      url,
      context: this._context,
    });
  }

  app(url: string): AppRpc {
    return {
      entityEndpoint: new TrpcEntityEndpointRpc({
        url: `${url}/endpoints`,
        context: this._context,
      }),
      binary: new HttpBinaryRpc({
        url: `${url}/binaries`,
        context: this._context,
      })
    }
  }
  
}

