import { TypeScheme } from '../../../common/specs';
import { EventEmitter } from '../../../utils/event-emitter';
import { ApplicationContext } from "./context";
import { ReadEntity } from './entity';

export interface EntityList_FetchOptions {
    limit?: number;
    offset?: number;
    filter_field?: string;
    filter_value?: unknown;
    sort_field?: string;
}

export interface EntityList_Column {
    field: string;
    name: string;
    type: TypeScheme;
}

export interface EntityListOptions {
    context: ApplicationContext;
    entityType: string;
    endpoint?: string;
}

export class EntityList {
    private _context: ApplicationContext;
    private entityType: string;
    private endpoint?: string;

    readonly onItemsUpdated: EventEmitter<ReadEntity[]>;
    readonly columns: EntityList_Column[];
    
    total: number;
    items: ReadEntity[];

    constructor(options: EntityListOptions) {
        this.onItemsUpdated = new EventEmitter();
        this._context = options.context;
        this.entityType = options.entityType;
        this.endpoint = options.endpoint;
        this.columns = []; // TODO
        
        this.total = 0;
        this.items = [];
    }

    async fetch(options: EntityList_FetchOptions): Promise<void> {
        // return [[], 0];
    }
}
