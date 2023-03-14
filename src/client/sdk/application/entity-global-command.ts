import { Spec_EntityGlobalCommand } from "../../../common/specs";
import { ApplicationContext } from "./context";
import { Payloads } from "./payloads";

export interface EntityGlobalCommandOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
    spec: Spec_EntityGlobalCommand;
}

export class EntityGlobalCommand {

    private _context: ApplicationContext;
    private _spec: Spec_EntityGlobalCommand;
    readonly entityType: string;
    readonly endpoint?: string;
    readonly payloads: Payloads;

    constructor(options: EntityGlobalCommandOptions) {
        this._context = options.context;
        this._spec = options.spec;
        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
        this.payloads = new Payloads({
            context: this._context,
            specs: this._spec.payloads
        });
    }
}