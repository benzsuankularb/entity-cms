import { Spec_Entity } from "../../../common/specs";
import { ApplicationContext } from "./context";
import { Entity_Command } from "./entity-mutations/entity-command";
import { Entity_Section } from "./entity-mutations/entity-section";
import { ReadonlyPayloads } from "./readonly-payload";

export interface EntityOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
    entityId: string;
}

export class Entity {
    private readonly _context: ApplicationContext;
    private readonly _spec: Spec_Entity;
    
    private _created?: number | boolean;
    private _deleted?: number | boolean;

    readonly entityId: string;
    readonly entityType: string;
    readonly endpoint?: string;
    readonly sections: Entity_Section[];
    readonly commands: Entity_Command[];
    
    get created(): number | boolean | undefined {
        return this._created;
    }

    get deleted(): number | boolean | undefined {
        return this._deleted;
    }
    
    constructor(options: EntityOptions) {
        this._context = options.context;
        this.entityId = options.entityId;
        this.entityType = options.entityType;
        this._spec = options.context.spec.entities[options.entityType];

        const sectionSpecs = this._spec.sections ?? {};
        this.sections = Object.keys(sectionSpecs).map(sectionId => {
            const spec = sectionSpecs[sectionId];
            return new Entity_Section({
                context: this._context,
                entityType: this.entityType,
                entityId: this.entityId,
                endpoint: this.endpoint,
                sectionId,
                spec,
            })
        });

        const commandSpecs = this._spec.commands ?? [];
        this.commands = commandSpecs.map(commandSpec => {
            return new Entity_Command({
                context: this._context,
                entityType: this.entityType,
                entityId: this.entityId,
                endpoint: this.endpoint,
                spec: commandSpec,
            })
        });
    }
}

export interface ReadEntity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    payloads: ReadonlyPayloads[];
    commands?: { name: string; command: string; scope?: string; }[];
    toString(): string;
}
