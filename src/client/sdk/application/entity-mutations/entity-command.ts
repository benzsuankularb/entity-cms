import { Spec_EntityCommand } from "../../../../common/specs";
import { ApplicationContext } from "../context";

export interface Entity_CommandOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
    entityId: string;
    spec: Spec_EntityCommand;
}

export class Entity_Command {

    private _context: ApplicationContext;
    private _spec: Spec_EntityCommand;
    
    readonly entityType: string;
    readonly endpoint?: string;
    readonly entityId: string;
    readonly payloads: Payloads;

    // getter...
    // name
    // command
    // scope

    constructor(options: Entity_CommandOptions) {
        this._context = options.context;
        this._spec = options.spec;

        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
        this.entityId = options.entityId;
    }

    async execute(): Promise<void> {
        throw '';
    }
}