import { RpcBinaryHandler, RpcEntityEndpointHandler } from "./rpc/app/interfaces";
import { RpcSpecHandler } from "./rpc/spec/interfaces";

declare global {
  namespace Express {
    interface Request {
      appRpc: {
        entityEndpointHandler: RpcEntityEndpointHandler;
        binaryHandler: RpcBinaryHandler;
      };
      specRpc: {
        specHandler: RpcSpecHandler;
      }
    }
  }
}