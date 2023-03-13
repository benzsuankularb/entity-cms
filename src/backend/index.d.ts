import { AppRpc, SpecRpc } from "./rpc";

declare global {
  namespace Express {
    interface Request {
      appRpc: {
        entityEndpointHandler: AppRpc.RpcEntityEndpointHandler;
        binaryHandler: AppRpc.RpcBinaryHandler;
        requestContext: AppRpc.RpcReqeustContext;
      };
      specRpc: {
        specHandler: SpecRpc.RpcSpecHandler;
        requestContext: SpecRpc.RpcReqeustContext;
      }
    }
  }
}