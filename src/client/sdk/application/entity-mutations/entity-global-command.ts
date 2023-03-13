import { Spec_GlobalCommand } from "../../../../common/specs";
import { ApplicationContext } from "../context";
import { Payloads } from "../payloads";

export interface Entity_GlobalCommandOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
    spec: Spec_GlobalCommand;
}

export class Entity_GlobalCommand {

    private _context: ApplicationContext;
    private _spec: Spec_GlobalCommand;
    readonly entityType: string;
    readonly endpoint?: string;
    readonly payloads: Payloads;

    constructor(options: Entity_GlobalCommandOptions) {
        this._context = options.context;
        this._spec = options.spec;
        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
    }
}