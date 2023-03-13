import { RpcSpecHandler } from "./rpc/spec/interfaces";

declare global {
  namespace Express {
    interface Request {
      appRpc: {
        endpointHandler: RpcEntityEndpointHandler;
        binaryHandler: RpcBinaryHandler;
      };
      specRpc: {
        specHandler: RpcSpecHandler;
      }
    }
  }
}