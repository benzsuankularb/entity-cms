import { Spec_Root } from '../../../common/specs';
import { RpcClient } from '../../rpc/client';

export type CustomFunction = () => Promise<void>;

export interface ApplicationContext {
    rpc: RpcClient;
    spec: Spec_Root;
    functions: { [id: string]: CustomFunction; };
}