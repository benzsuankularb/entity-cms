import * as Spec from '../../specs';
import { EntityGlobalCommand } from './command';
import { Entity, ListEntity } from './models';

export class EntityCMSContext {
}

export class EntityCMSClient {

    private spec: Spec.EntityCMS_Specification;
    
    constructor(spec: Spec.EntityCMS_Specification) {
        this.spec = spec;
    }
    
    getDefinition(entity: string): EntityDefinition {
        const spec = this.spec.entities[entity];
        if (!spec) {
            throw `invalid spec for entity ${entity}`
        }
        return new EntityDefinition(spec);
    }

    getMenu(): Spec.EntityCMS_MenuItem[] {
        return this.spec.menuItems
    }
}

export class EntityDefinition {
    private spec: Spec.EntityDefinition;

    readonly singleton: boolean = true;
    readonly globalCommands: EntityGlobalCommand[] = [];
    
    constructor(spec: Spec.EntityDefinition) {
        this.spec = spec;
    }

    getList(): EntityList {
        throw "";
    }

    async getEntity(id: string): Promise<Entity> {
        return { // TODO
            id,
            sections: [],
            commands: [],
        };
    }
}

export interface EntityList_FetchOptions {
    limit?: number;
    offset?: number;
    filter_field?: string;
    filter_value?: unknown;
    sort_field?: string;
}

export interface EntityListColumnField {
    name: string;
    type: Spec.TypeScheme;
}

export class EntityList {
    readonly columnFields: { field: string; name: string; type: Spec.TypeScheme; }[] = [] //TODO
    
    async fetch(options: EntityList_FetchOptions): Promise<[items: ListEntity[], total: number]> {
        return [[], 0];
    }
}
