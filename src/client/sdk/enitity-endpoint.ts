import * as Spec from '../../specs';
import { EntityGlobalCommand } from './command';
import { EntityCMSContext } from "./common";
import { Entity } from './entity';
import { EntityList } from "./entity-list";


export class EntityEndPoint {
    private context: EntityCMSContext;
    readonly id: string = '';
    readonly name: string = '';
    readonly entityId: string = '';
    readonly singleton: boolean = true;
    readonly globalCommands: EntityGlobalCommand[] = [];

    constructor(options: { context: EntityCMSContext; endpointSpec: Spec.Spec_EntityEndPoint; entityDefSpec: Spec.Spec_EntityDefinition; }) {
        this.context = options.context;
    }

    getList(): EntityList {
        throw "";
    }

    async getEntity(id: string): Promise<Entity> {
        return {
            id,
            sections: [],
            commands: [],
        };
    }
}
