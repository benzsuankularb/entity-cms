import * as z from 'zod';
import { TypeScheme } from './scheme';

const Payload = z.object({
    id: z.string(),
    name: z.string(),
    uint: z.string().optional(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    readOnly: z.boolean().optional(),
    required: z.boolean().optional(),
    typeScheme: TypeScheme
});

const Payloads = Payload.array();

const EntityCommand_Delete = z.object({
    id: z.enum(['delete'])
});

const EntityCommand_Update = z.object({
    id: z.enum(['update']),
    score: z.string()
});

const EntityCommand_Execute = z.object({
    id: z.enum(['execute']),
    name: z.string(),
    function: z.string().optional(),
    payloads: Payloads
});

const EntityCommand = EntityCommand_Delete.or(EntityCommand_Update).or(EntityCommand_Execute);

const EntityGlobalCommand_Create = z.object({
    id: z.enum(['create']),
    payloads: Payload.array()
});

const EntityGlobalCommand_Execute = z.object({
    id: z.enum(['execute']),
    name: z.string(),
    function: z.string().optional(),
    payloads: Payload.array()
});

const EntityGlobalCommand = EntityGlobalCommand_Create.and(EntityGlobalCommand_Execute);

const EntitySectionDefinition = z.object({
    id: z.string(),
    name: z.string(),
    payloads: Payload.array()
});

const EntityDefinition = z.object({
    name: z.string(),
    singleton: z.boolean().optional(),
    globalCommands: EntityGlobalCommand.array(),
    commands: EntityCommand.array(),
    sections: EntitySectionDefinition.array(),
    display: z.object({
        list: z.object({
            columns: z.object({
                name: z.string(),
                format: z.string(),
            }).array(),
            filters: z.object({
                field: z.string(),
                lowest: z.any().optional(),
                higest: z.any().optional(),
                allowRange: z.boolean().optional()
            }).array()
        }).optional(),
        embeded: z.object({
            format: z.string(),
        }).optional()
    }).optional()
});

type _EntityCMS_MenuItem = {
    name: string;
    entity?: string;
    items: _EntityCMS_MenuItem[];
};

const EntityCMS_MenuItem: z.ZodType<_EntityCMS_MenuItem> = z.object({
    name: z.string(),
    entity: z.string().optional(),
    items: z.lazy(() => EntityCMS_MenuItem.array()),
});

export const EntityCMS_Specification = z.object({
    version: z.string(),
    name: z.string(),
    menuItems: EntityCMS_MenuItem.array(),
    authentication: z.enum(['none', 'basic', 'baerer']),
    entities: z.record(
        z.string(),
        EntityDefinition
    ),
});

export type EntityCMS_Specification = z.infer<typeof EntityCMS_Specification>;
export type EntityCMS_MenuItem = z.infer<typeof EntityCMS_MenuItem>;
export type EntityDefinition = z.infer<typeof EntityDefinition>;
export type EntitySectionDefinition = z.infer<typeof EntitySectionDefinition>;
export type EntityGlobalCommand = z.infer<typeof EntityGlobalCommand>;
export type EntityCommand = z.infer<typeof EntityCommand>;
export type Payload = z.infer<typeof Payload>;
export type Payloads = z.infer<typeof Payloads>;