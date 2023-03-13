import { Spec_EntitySection } from "../../../../common/specs";
import { ApplicationContext } from "../context";

export interface Entity_SectionOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
    entityId: string;
    sectionId: string;
    spec: Spec_EntitySection;
}

export class Entity_Section {

    private _context: ApplicationContext;
    private _spec: Spec_EntitySection;
    
    readonly entityType: string;
    readonly endpoint?: string;
    readonly entityId: string;
    readonly sectionId: string;
    
    get readOnly(): boolean {
        return this._spec.readOnly ?? false;
    }

    constructor(options: Entity_SectionOptions) {
        this._context = options.context;
        this._spec = options.spec;

        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
        this.entityId = options.entityId;
        this.sectionId = options.sectionId;
    }

    async update(): Promise<void> {
        throw '';
    }
}