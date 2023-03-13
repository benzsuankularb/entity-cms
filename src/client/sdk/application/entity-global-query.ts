import { Spec_EntityGloablQuery, TypeScheme } from '../../../common/specs';
import { EventEmitter } from '../../../utils/event-emitter';
import { ApplicationContext } from "./context";
import { ReadEntity } from './entity';

export interface EntityGlobalQuery_FetchOptions {
    limit?: number;
    offset?: number;
    filter_field?: string;
    filter_value?: unknown;
    sort_field?: string;
}

export interface EntityGlobalQuery_Column {
    field: string;
    name: string;
    type: TypeScheme;
}

export interface EntityGlobalQuery_Options {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
    spec: Spec_EntityGloablQuery;
}

export class EntityGlobal_Query {
    private _context: ApplicationContext;
    private entityType: string;
    private endpoint?: string;

    readonly onItemsUpdated: EventEmitter<ReadEntity[]>;
    readonly columns: EntityGlobalQuery_Column[];
    
    total: number;
    items: ReadEntity[];

    constructor(options: EntityGlobalQuery_Options) {
        this.onItemsUpdated = new EventEmitter();
        this._context = options.context;
        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
        this.columns = []; // TODO
        
        this.total = 0;
        this.items = [];
    }

    async fetch(options: EntityGlobalQuery_FetchOptions): Promise<void> {
        // return [[], 0];
    }
}
