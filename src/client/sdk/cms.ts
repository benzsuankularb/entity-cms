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
    
    getEndpoint(id: string): EntityEndPoint {
        const { context } = this;
        const endpointSpec = context.spec.endpoints[id];
        if (!endpointSpec) {
            throw `invalid endpoint ${id}`
        }
        
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const entityDefSpec = context.spec.entities[endpointSpec.entity]!;
        return new EntityEndPoint({
            context,
            endpointSpec,
            entityDefSpec,
        });
    }

    getMenu(): MenuItem[] {
        return this.context.spec.menuItems
    }
}
