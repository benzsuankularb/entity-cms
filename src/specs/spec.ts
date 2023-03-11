import * as z from 'zod';
import { TypeScheme } from './scheme';

const Spec_WritePayload = z.object({
    id: z.string(),
    name: z.string(),
    suffix: z.string().optional(),
    description: z.string().optional(),
    placeholder: z.string().optional(),
    suggestion: z.enum(['full', 'partial']).optional(),
    readOnly: z.boolean().optional(),
    typeScheme: TypeScheme
});

const Spec_ReadPayload = z.object({
    id: z.string(),
    name: z.string(),
    typeScheme: TypeScheme
});

const Spec_EntityCommand_Delete = z.object({
    command: z.enum(['delete']),
    endpoints: z.string().optional(),
});

const Spec_EntityCommand_Update = z.object({
    command: z.enum(['update']),
    section: z.string(),
    endpoints: z.string().optional(),
    score: z.string()
});

const Spec_EntityCommand_Execute = z.object({
    command: z.enum(['execute']),
    action: z.string(),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_WritePayload.array(),
});

const Spec_EntityCommand = Spec_EntityCommand_Delete.or(Spec_EntityCommand_Update).or(Spec_EntityCommand_Execute);

const Spec_Entity_Section = z.object({
    id: z.string(),
    name: z.string(),
    payloads: Spec_WritePayload.array()
});

const Spec_GlobalCommand_Create = z.object({
    command: z.enum(['create']),
    endpoints: z.string().optional(),
    payloads: Spec_WritePayload.array()
});

const Spec_GlobalCommand_Execute = z.object({
    command: z.enum(['execute']),
    action: z.string(),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_WritePayload.array()
});

const Spec_GlobalCommand = Spec_GlobalCommand_Create.and(Spec_GlobalCommand_Execute);

const Spec_ReadEntityQuery = z.object({
    name: z.string(),
    filters: z.object({
        field: z.string(),
        lowest: z.any().optional(),
        higest: z.any().optional(),
        allowRange: z.boolean().optional()
    }).array(),
});

const Spec_Entity = z.object({
    name: z.string(),
    singleton: z.boolean().optional(),
    endpoints: z.record(
        z.string(),
        z.object({
            name: z.string(),
        }),
    ).optional(),
    entity: z.object({
        sections: Spec_Entity_Section.array(),
    }).optional(),
    readEntity: z.object({
        payloads: Spec_ReadPayload.array(),
        display: z.object({
            fields: z.string().array(),
            format: z.string(),
        }),
    }),
    commands: Spec_EntityCommand.array(),
    globalCommands: Spec_GlobalCommand.array(),
    query: Spec_ReadEntityQuery.array().optional(),
});

type _MenuItem = {
    name: string;
    items: _MenuItem[];
    endpoint?: { entity: string; endpoint?: string; }
};

const Spec_MenuItem: z.ZodType<_MenuItem> = z.object({
    name: z.string(),
    endpoint: z.object({
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
export type Spec_WritePayload = z.infer<typeof Spec_WritePayload>;
export type Spec_ReadPayload = z.infer<typeof Spec_ReadPayload>;
export type Spec_Entity = z.infer<typeof Spec_Entity>;
export type Spec_ReadEntityQuery = z.infer<typeof Spec_ReadEntityQuery>;
export type Spec_Entity_Section = z.infer<typeof Spec_Entity_Section>;
export type Spec_EntityCommand = z.infer<typeof Spec_EntityCommand>;
export type Spec_GlobalCommand = z.infer<typeof Spec_GlobalCommand>;

export type Spec_EntityCommand_Delete = z.infer<typeof Spec_EntityCommand_Delete>;
export type Spec_EntityCommand_Update = z.infer<typeof Spec_EntityCommand_Update>;
export type Spec_EntityCommand_Execute = z.infer<typeof Spec_EntityCommand_Execute>;

export type Spec_GlobalCommand_Execute = z.infer<typeof Spec_GlobalCommand_Execute>;
export type Spec_GlobalCommand_Create = z.infer<typeof Spec_GlobalCommand_Create>;