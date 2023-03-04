import { Payloads } from "./payload";

export interface EntitySectionController {
    id: string;
    name: string;
    payloads: Payloads;
    update: () => Promise<void> | undefined;
}

export interface EntityGlobalCommandController {
    command: string;
    scope: string;
    payloads: Payloads;
    execute(): Promise<void>;
}

export interface EntityCommandController {
    entityId: string;
    command: string;
    name: string;
    scope: string;
    payloads: Payloads;
    execute(): Promise<void>;
}

// type EntityData = {
//     id: string;
//     commands?: Array<string>, // 'delete', 'update.section1', 'update.section1'
//     createdTime?: number,
//     deletedTime?: number
// // } & { [section: string]: unknown; };

// type EmbededEntities = { [entity: string]: { [id: string]: EntityData } }
// type EntityFetchResponse = [data: EntityData, embededEntities: EmbededEntities];
// type EntityBucketFetchResponse = [datas: EntityData[], count: number, embededEntities: EmbededEntities];