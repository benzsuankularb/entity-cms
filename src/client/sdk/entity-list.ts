import * as Spec from '../../common/specs';
import { EventEmitter } from '../../utils/event-emitter';
import { EntityCMSContext } from "./common";
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
    type: Spec.TypeScheme;
}

export interface EntityListOptions {
    context: EntityCMSContext;
    entityId: string;
    endpoint?: string;
    columns: EntityList_Column[];
}

export class EntityList {
    private context: EntityCMSContext;
    private entityId: string;
    private endpoint?: string;

    readonly onItemsUpdated: EventEmitter<ReadEntity[]>;
    readonly columns: EntityList_Column[];
    // readonly commands: EntityList_Command[];
    
    total: number;
    items: ReadEntity[];

    constructor(options: EntityListOptions) {
        this.onItemsUpdated = new EventEmitter();
        this.context = options.context;
        this.entityId = options.entityId;
        this.endpoint = options.endpoint;
        this.columns = options.columns;
        
        this.total = 0;
        this.items = [];
    }

    async fetch(options: EntityList_FetchOptions): Promise<void> {
        // return [[], 0];
    }
}
