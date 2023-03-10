import { Spec_Entity } from '../../specs';
import { EntityList_Command } from './command';
import { EntityCMSContext } from "./common";
import { Entity } from './entity';
import { EntityList } from "./entity-list";

export interface EntityEndPointOptions {
    context: EntityCMSContext;
    entitySpec: Spec_Entity;
    endpoint?: string;
}

export class EntityEndPoint {
    private context: EntityCMSContext;
    readonly entitySpec: Spec_Entity;
    readonly endpoint?: string;
    readonly name: string = '';
    readonly singleton: boolean = true;
    readonly globalCommands: EntityList_Command[] = [];

    constructor(options: EntityEndPointOptions) {
        this.context = options.context;
        this.entitySpec = options.entitySpec;
        this.endpoint = options.endpoint;
    }

    async getList(): Promise<EntityList> {
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
