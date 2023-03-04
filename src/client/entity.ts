import { EntityCommandController, EntityGlobalCommandController, EntitySectionController } from "./controller";

export interface EntitiesContext {
    getDefinition(entity: string): EntityDefinition;
}

export interface EntityDefinition {
    singleton: boolean;
    getList(): Promise<EntityList>;
    getEntity(id: string): Promise<Entity>;
    globalCommands: EntityGlobalCommand[];
}

export interface EntityList_FetchOptions {
    limit?: number;
    offset?: number;
    filter_field?: string;
    filter_value?: unknown;
    sort_field?: string;
}

export interface EntityList {
    fetch(options: EntityList_FetchOptions): Promise<void>;
    columns: EntityListColumnField<unknown>[];
    items: Entity[];
    offset: number;
    total: number;
}

export interface EntityListColumnField<T> {
    id: string;
    type: string;
    value: T;
}

export interface EntityGlobalCommand {
    command: string;
    scope?: string;
    createController(): EntityGlobalCommandController;
}

export interface Entity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    sections: EntitySection[];
    commands: EntityCommand[];
    toListColumns(): unknown[];
    toEmbededString(): string;
}

export interface EntitySection {
    id: string;
    data: unknown;
    createController(): EntitySectionController;
}

export interface EntityCommand {
    command: string;
    scope?: string;
    createController(): EntityCommandController;
}