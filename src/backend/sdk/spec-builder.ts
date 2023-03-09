

export interface SpecBuilderOptions {
    name: string,
}

export interface SpecBuilder {
    auth(auth: SpecBuilder_Authentication): this;
    menu(root: SpecBuilder_MenuItem): this;
    binary(id: string): this;
    entity(entity: SpecBuilder_Entity<unknown>): this;
}

export interface SpecBuilder_AuthenticationOptions {
    
}

export interface SpecBuilder_Authentication {
    name: string,
}

export interface SpecBuilder_MenuItemOptions {
    endpoint?: string;
}

export interface SpecBuilder_MenuItem {
    submenu(item: SpecBuilder_MenuItem): this;
}

export interface SpecBuilder_Entity<T> {
    section(): this;
    command(): this;
    endpoint(): this;
}

interface SpecBuilder_BinaryOptions {
    storage: string;
    mimeType: string;
}

export class SpecBuilder_Binary {
    
}

export default {
    server: (options: SpecBuilderOptions) => SpecBuilder;
    menu: (options: SpecBuilder_MenuItemOptions) => SpecBuilder_MenuItem;
    binary: (options: SpecBuilder_BinaryOptions) => SpecBuilder_Binary;
    auth: (options: SpecBuilder_AuthenticationOptions) => SpecBuilder_Authentication;
    entity: (options: SpecBuilder_EntityOptions) => SpecBuilder_Entity;
    entitySection: (options: SpecBuilder_EntitySectionOptions) => SpecBuilder_EntitySection;
    entityCommand: (options: SpecBuilder_EntityCommandOptions) => SpecBuilder_EntityCommand;
    entityGlobalCommand: (options: SpecBuilder_EntityGlobalCommandOptions) => SpecBuilder_EntityGlobalCommand;
    entityEndPoint: (options: SpecBuilder_EntityEndPointOptions) => SpecBuilder_EntityEndPoint;
}