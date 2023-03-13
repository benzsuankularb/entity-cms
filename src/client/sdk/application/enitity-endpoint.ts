import { Spec_Entity } from '../../../common/specs';
import { ApplicationContext } from "./context";
import { Entity } from './entity';
import { EntityGlobalCommand } from './entity-global-command';
import { EntityGlobal_Query } from "./entity-global-query";

export interface EntityEndpointOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
}

export class EntityEndpoint {
    private _context: ApplicationContext;
    private _spec: Spec_Entity;
    
    readonly entityType: string;
    readonly endpoint?: string;
    readonly commands: EntityGlobalCommand[];
    readonly queries: EntityGlobal_Query[];
    
    get singleton(): boolean {
        return this._spec.singleton ?? false;
    }

    get name(): string {
        return this._spec.name ?? false;
    }

    constructor(options: EntityEndpointOptions) {
        this._context = options.context;
        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
        this._spec = options.context.spec.entities[options.entityType];

        if (!this._spec) {
            throw `invalid entity ${options.entityType}`;
        }

        const commandSpecs = this._spec.globalCommands ?? [];
        this.commands = commandSpecs.map(commandSpec => {
            return new EntityGlobalCommand({
                context: options.context,
                entityType: options.entityType,
                endpoint: options.endpoint,
                spec: commandSpec
            });
        });

        const querySpecs = this._spec.queries ?? [];
        this.queries = querySpecs.map(querySpec => {
            return new EntityGlobal_Query({
                context: options.context,
                entityType: options.entityType,
                endpoint: options.endpoint,
                spec: querySpec
            });
        });
    }

    getEntity(id: string): Entity {
        return new Entity({
            context: this._context,
            entityType: this.entityType,
            endpoint: this.endpoint,
            entityId: id,
        })
    }
}
