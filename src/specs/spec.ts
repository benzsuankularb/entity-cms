import * as z from 'zod';
import { TypeScheme } from './scheme';

const Spec_Payload = z.object({
    id: z.string(),
    name: z.string(),
    uint: z.string().optional(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    readOnly: z.boolean().optional(),
    required: z.boolean().optional(),
    typeScheme: TypeScheme
});

const Spec_Payloads = Spec_Payload.array();

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
    payloads: Spec_Payloads
});

const Spec_EntityCommand = EntityCommand_Delete.or(EntityCommand_Update).or(EntityCommand_Execute);

const EntityGlobalCommand_Create = z.object({
    id: z.enum(['create']),
    payloads: Spec_Payload.array()
});

const EntityGlobalCommand_Execute = z.object({
    id: z.enum(['execute']),
    name: z.string(),
    function: z.string().optional(),
    payloads: Spec_Payload.array()
});

const Spec_EntityGlobalCommand = EntityGlobalCommand_Create.and(EntityGlobalCommand_Execute);

const Spec_EntitySectionDefinition = z.object({
    id: z.string(),
    name: z.string(),
    payloads: Spec_Payload.array()
});

const Spec_EntityDefinition = z.object({
    singleton: z.boolean().optional(),
    globalCommands: Spec_EntityGlobalCommand.array(),
    commands: Spec_EntityCommand.array(),
    sections: Spec_EntitySectionDefinition.array(),
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

const Spec_EntityEndPoint = z.object({
    name: z.string(),
    entity: z.string()
});

type _MenuItem = {
    name: string;
    items: _MenuItem[];
    endpoint?: string;
};

const Spec_MenuItem: z.ZodType<_MenuItem> = z.object({
    name: z.string(),
    entity: z.string().optional(),
    items: z.lazy(() => Spec_MenuItem.array()),
});

export const Spec_Root = z.object({
    version: z.string(),
    name: z.string(),
    authentication: z.enum(['none', 'basic', 'baerer']),
    menuItems: Spec_MenuItem.array(),
    endpoints: z.record(
        z.string(),
        Spec_EntityEndPoint,
    ),
    entities: z.record(
        z.string(),
        Spec_EntityDefinition
    ),
});

export type Spec_Root = z.infer<typeof Spec_Root>;
export type Spec_MenuItem = z.infer<typeof Spec_MenuItem>;
export type Spec_EntityEndPoint = z.infer<typeof Spec_EntityEndPoint>;
export type Spec_EntityDefinition = z.infer<typeof Spec_EntityDefinition>;
export type Spec_EntitySectionDefinition = z.infer<typeof Spec_EntitySectionDefinition>;
export type Spec_EntityGlobalCommand = z.infer<typeof Spec_EntityGlobalCommand>;
export type Spec_EntityCommand = z.infer<typeof Spec_EntityCommand>;
export type Spec_Payload = z.infer<typeof Spec_Payload>;
export type Spec_Payloads = z.infer<typeof Spec_Payloads>;