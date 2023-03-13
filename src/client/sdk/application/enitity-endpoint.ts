import { Spec_Entity } from '../../../common/specs';
import { ApplicationContext } from "./context";
import { Entity } from './entity';
import { EntityList } from "./entity-list";
import { Entity_GlobalCommand } from './entity-mutations/entity-global-command';

export interface EntityEndPointOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
}

export class EntityEndPoint {
    private _context: ApplicationContext;
    private _spec: Spec_Entity;
    
    readonly entityType: string;
    readonly endpoint?: string;
    readonly globalCommands: Entity_GlobalCommand[];
    
    get singleton(): boolean {
        return this._spec.singleton ?? false;
    }

    get name(): string {
        return this._spec.name ?? false;
    }

    constructor(options: EntityEndPointOptions) {
        this._context = options.context;
        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
        this._spec = options.context.spec.entities[options.entityType];

        if (!this._spec) {
            throw `invalid entity ${options.entityType}`;
        }

        const commandSpecs = this._spec.globalCommands ?? [];
        this.globalCommands = commandSpecs.map(commandSpec => {
            return new Entity_GlobalCommand({
                context: options.context,
                entityType: options.entityType,
                endpoint: options.endpoint,
                spec: commandSpec
            });
        });

        // TODO validate endpoint
    }

    getList(): EntityList {
        const { _context: context, endpoint, entityType } = this;
        return new EntityList({
            context: context,
            endpoint,
            entityType,
        });
    }

    getEntity(id: string): Entity {
        // new Entity {

        // }
        // return {
        //     id,
        //     sections: [],
        //     commands: [],
        // };
        throw '';
    }
}
