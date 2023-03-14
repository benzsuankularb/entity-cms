import { Spec_Entity } from "../../../common/specs";
import { ApplicationContext } from "./context";
import { EntityCommand } from "./entity-command";
import { EntitySection } from "./entity-section";
import { ReadonlyPayloadField_Unknown } from "./readonly-payload-field";

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
    readonly sections: EntitySection[];
    readonly commands: EntityCommand[];
    
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
            return new EntitySection({
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
            return new EntityCommand({
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
    payloads: ReadonlyPayloadField_Unknown[];
    commands?: { name: string; command: string; scope?: string; }[];
    toString(): string;
}
