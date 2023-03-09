import { EventEmitter } from 'stream';
import * as Spec from '../../specs';
import { EntityCMSContext } from "./common";

export interface ListEntity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    columnDatas: unknown[];
    commands: { name: string; command: string; scope?: string; }[];
}

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

    readonly onUpdated: EventEmitter;
    readonly columns: EntityList_Column[];

    total: number;
    items: ListEntity[];

    constructor(options: EntityListOptions) {
        this.onUpdated = new EventEmitter();
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
