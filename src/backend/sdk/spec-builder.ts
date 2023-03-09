import { z } from "zod";


export interface SpecBuilderOptions {
    name: string,
}

export interface SpecBuilder<TRequestContext> {
    auth(auth: SpecBuilder_Authentication<TRequestContext>): this;
    menu(root: SpecBuilder_MenuItem<TRequestContext>): this;
    binary(id: SpecBuilder_Binary<TRequestContext>): this;
    entity(entity: SpecBuilder_Entity<TRequestContext, TEntity>): this;
}

export interface SpecBuilder_AuthenticationOptions<TRequestContext> {
    
}

export interface SpecBuilder_Authentication<TRequestContext> {
    name: string,
}

export interface SpecBuilder_MenuItemOptions<TRequestContext> {
    endpoint?: string;
}

export interface SpecBuilder_MenuItem<TRequestContext> {
    submenu(item: SpecBuilder_MenuItem<TRequestContext>): this;
}

export interface SpecBuilder_EntityOptions<TRequestContext, TEntity> {
    type: z.ZodType;
}

export interface SpecBuilder_Entity<TRequestContext, TEntity> {
    section(): this;
    command(): this;
    endpoint(): this;
}

export interface SpecBuilder_BinaryOptions<TRequestContext> {
    storage: string;
    mimeType: string;
}

export class SpecBuilder_Binary<TRequestContext> {
    
}

export class SpecBuilderContext<TRequestContext> {
    init(options: SpecBuilderOptions<TRequestContext>): SpecBuilder<TRequestContext> {
        throw ''
    }

    menu: (options: SpecBuilder_MenuItemOptions<TRequestContext>): SpecBuilder_MenuItem<TRequestContext> {
        throw ''
    }

    binary: (options: SpecBuilder_BinaryOptions<TRequestContext>): SpecBuilder_Binary<TRequestContext> {
        throw ''
    }

    auth: (options: SpecBuilder_AuthenticationOptions<TRequestContext>): SpecBuilder_Authentication<TRequestContext> {
        throw ''
    }

    entity: (options: SpecBuilder_EntityOptions<TRequestContext>): SpecBuilder_Entity<TRequestContext> {
        throw ''
    }

    entitySection: (options: SpecBuilder_EntitySectionOptions<TRequestContext>): SpecBuilder_EntitySection<TRequestContext> {
        throw ''
    }

    entityCommand: (options: SpecBuilder_EntityCommandOptions<TRequestContext>): SpecBuilder_EntityCommand<TRequestContext> {
        throw ''
    }

    entityGlobalCommand: (options: SpecBuilder_EntityGlobalCommandOptions<TRequestContext>): SpecBuilder_EntityGlobalCommand<TRequestContext> {
        throw ''
    }

    entityEndPoint: (options: SpecBuilder_EntityEndPointOptions<TRequestContext>): SpecBuilder_EntityEndPoint<TRequestContext> {
        throw ''
    }

}