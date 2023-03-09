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
    name: string;
    type: Spec.TypeScheme;
}

export class EntityList {
    private context: EntityCMSContext;
    readonly columns: { field: string; name: string; type: Spec.TypeScheme; }[];
    declare onUpdate: () => void | null;
    declare total: number;
    declare items: ListEntity[]

    constructor(options: { context: EntityCMSContext; }) {
        this.context = options.context;
        this.columns = [];
    }

    async fetch(options: EntityList_FetchOptions): Promise<void> {
        // return [[], 0];
    }
}
