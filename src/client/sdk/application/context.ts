import { Spec_Root } from '../../../common/specs';
import { AppRpc } from '../../rpc/client';

export type CustomFunction = () => Promise<void>;

export interface ApplicationContext {
    rpc: AppRpc;
    spec: Spec_Root;
    functions: { [id: string]: CustomFunction; };
}