import * as z from 'zod';
import { TypeScheme } from './scheme';

const Spec_Payload = z.object({
    id: z.string(),
    name: z.string(),
    suffix: z.string().optional(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    suggestion: z.enum(['full', 'partial']).optional(),
    readOnly: z.boolean().optional(),
    typeScheme: TypeScheme
});

const Spec_Payloads = Spec_Payload.array();

const EntityCommand_Delete = z.object({
    id: z.enum(['delete']),
    endpoints: z.string().optional(),
});

const EntityCommand_Update = z.object({
    id: z.enum(['update']),
    endpoints: z.string().optional(),
    score: z.string()
});

const EntityCommand_Execute = z.object({
    id: z.enum(['execute']),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_Payloads
});

const Spec_EntityCommand = EntityCommand_Delete.or(EntityCommand_Update).or(EntityCommand_Execute);

const EntityGlobalCommand_Create = z.object({
    id: z.enum(['create']),
    endpoints: z.string().optional(),
    payloads: Spec_Payload.array()
});

const EntityGlobalCommand_Execute = z.object({
    id: z.enum(['execute']),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_Payload.array()
});

const Spec_EntityGlobalCommand = EntityGlobalCommand_Create.and(EntityGlobalCommand_Execute);

const Spec_EntitySection = z.object({
    id: z.string(),
    name: z.string(),
    payloads: Spec_Payload.array()
});

const Spec_Entity = z.object({
    name: z.string(),
    singleton: z.boolean().optional(),
    globalCommands: Spec_EntityGlobalCommand.array(),
    commands: Spec_EntityCommand.array(),
    sections: Spec_EntitySection.array(),
    endpoints: z.record(
        z.string(),
        z.object({
            name: z.string(),
        }),
    ).optional(),
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

type _MenuItem = {
    name: string;
    items: _MenuItem[];
    endpoint?: { entity: string; endpoint?: string; }
};

const Spec_MenuItem: z.ZodType<_MenuItem> = z.object({
    name: z.string(),
    endpoints: z.object({
        entity: z.string(),
        endpoint: z.string().optional(),
    }).optional(),
    items: z.lazy(() => Spec_MenuItem.array()),
});

export const Spec_Root = z.object({
    version: z.string(),
    name: z.string(),
    authentication: z.enum(['none', 'basic', 'baerer']),
    menuItems: Spec_MenuItem.array(),
    entities: z.record(
        z.string(),
        Spec_Entity
    ),
});

export type Spec_Root = z.infer<typeof Spec_Root>;
export type Spec_MenuItem = z.infer<typeof Spec_MenuItem>;
export type Spec_Entity = z.infer<typeof Spec_Entity>;
export type Spec_EntitySection = z.infer<typeof Spec_EntitySection>;
export type Spec_EntityGlobalCommand = z.infer<typeof Spec_EntityGlobalCommand>;
export type Spec_EntityCommand = z.infer<typeof Spec_EntityCommand>;
export type Spec_Payload = z.infer<typeof Spec_Payload>;
export type Spec_Payloads = z.infer<typeof Spec_Payloads>;