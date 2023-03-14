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

const Spec_EntityCommand_Execute = z.object({
    command: z.enum(['execute']),
    action: z.string(),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_WritePayload.array(),
});

const Spec_EntityCommand = Spec_EntityCommand_Delete
    .or(Spec_EntityCommand_Execute);


const Spec_EntityGlobalCommand_Create = z.object({
    command: z.enum(['create']),
    endpoints: z.string().optional(),
    payloads: Spec_WritePayload.array()
});

const Spec_EntityGlobalCommand_Execute = z.object({
    command: z.enum(['execute']),
    action: z.string(),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_WritePayload.array()
});

const Spec_EntityGlobalCommand =  Spec_EntityGlobalCommand_Create
    .or(Spec_EntityGlobalCommand_Execute);

const Spec_EntityGlobalQuery = z.object({
    name: z.string(),
    filters: z.object({
        field: z.string(),
        lowest: z.any().optional(),
        higest: z.any().optional(),
        allowRange: z.boolean().optional()
    }).array(),
});

const Spec_EntitySection = z.object({
    name: z.string(),
    readOnly: z.boolean().optional(),
    payloads: Spec_WritePayload.array(),
    endpoints: z.string().array().optional()
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
    sections: z.record(
        z.string(),
        Spec_EntitySection,
    ).optional(),
    readEntity: z.object({
        payloads: Spec_ReadPayload.array(),
        display: z.object({
            fields: z.string().array(),
            format: z.string(),
        }),
    }),
    globalCommands: Spec_EntityGlobalCommand.array().optional(),
    commands: Spec_EntityCommand.array().optional(),
    queries: Spec_EntityGlobalQuery.array().optional(),
});

export type Spec_MenuItem = {
    name: string;
    items: Spec_MenuItem[];
    endpoint?: { entity: string; endpoint?: string; }
};

const Spec_MenuItem: z.ZodType<Spec_MenuItem> = z.object({
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
export type Spec_WritePayload = z.infer<typeof Spec_WritePayload>;
export type Spec_ReadPayload = z.infer<typeof Spec_ReadPayload>;
export type Spec_Entity = z.infer<typeof Spec_Entity>;
export type Spec_EntitySection = z.infer<typeof Spec_EntitySection>;
export type Spec_EntityCommand = z.infer<typeof Spec_EntityCommand>;
export type Spec_EntityGloablQuery = z.infer<typeof Spec_EntityGlobalQuery>;
export type Spec_EntityGlobalCommand = z.infer<typeof Spec_EntityGlobalCommand>;

export type Spec_EntityCommand_Delete = z.infer<typeof Spec_EntityCommand_Delete>;
export type Spec_EntityCommand_Execute = z.infer<typeof Spec_EntityCommand_Execute>;

export type Spec_EntityGlobalCommand_Execute = z.infer<typeof Spec_EntityGlobalCommand_Execute>;
export type Spec_EntityGlobalCommand_Create = z.infer<typeof Spec_EntityGlobalCommand_Create>;