import * as Spec from '../../specs';
import { CustomFunction, EntityCMSContext } from './common';
import { EntityEndPoint } from './enitity-endpoint';

export type MenuItem = Spec.Spec_MenuItem;

export class EntityCMSClient {

    private context: EntityCMSContext;
    
    constructor(options: { spec: Spec.Spec_Root }) {
        this.context = new EntityCMSContext(options);
    }
    
    addFunction(id: string, handler: CustomFunction): this {
        this.context.functions[id] = handler;
        return this;
    }
    
    getEndpoint(entityId: string, endpoint?: string): EntityEndPoint {
        const { context } = this;
        const entitySpec = context.spec.entities[entityId];
        if (!entitySpec) {
            throw `invalid endpoint ${entityId}`
        }
        
        //TODO validate endpoint exist.
        
        return new EntityEndPoint({
            context,
            entitySpec,
            endpoint
        });
    }

    getMenu(): MenuItem[] {
        return this.context.spec.menuItems
    }
}
