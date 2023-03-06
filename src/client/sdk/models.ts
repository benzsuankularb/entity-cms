import { EntityCommand, EntitySection } from "./command";

export interface ListEntity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    columnDatas: unknown[];
    commands: { name: string; command: string; scope?: string; }[];
}

export interface EmbededEntity {
    id: string;
    display: string;
}

export interface Entity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    sections: EntitySection[];
    commands: EntityCommand[];
}
