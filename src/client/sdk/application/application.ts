import { Spec_MenuItem, Spec_Root } from '../../../common/specs';
import { RpcClient } from '../../rpc/client';
import { ApplicationContext, CustomFunction } from './context';
import { EntityEndpoint } from './enitity-endpoint';

export type MenuItem = Spec_MenuItem;

export interface ApplicationOptions {
    spec: Spec_Root;
    rpc: RpcClient;
}

export class Application {

    private _context: ApplicationContext;
    
    constructor(options: ApplicationOptions) {
        this._context = {
            functions: {},
            rpc: options.rpc,
            spec: options.spec
        };
    }
    
    addFunction(id: string, handler: CustomFunction): this {
        this._context.functions[id] = handler;
        return this;
    }
    
    getEndpoint(entityType: string, endpoint?: string): EntityEndpoint {
        const { _context: context } = this;
        const entitySpec = context.spec.entities[entityType];
        if (!entitySpec) {
            throw `invalid endpoint ${entityType}`
        }
        
        return new EntityEndpoint({
            context,
            entityType,
            endpoint
        });
    }

    getMenu(): MenuItem[] {
        return this._context.spec.menuItems;
    }
}
