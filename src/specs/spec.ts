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

const Spec_Entity_DeleteCommand = z.object({
    id: z.enum(['delete']),
    endpoints: z.string().optional(),
});

const Spec_Entity_UpdateCommand = z.object({
    id: z.enum(['update']),
    endpoints: z.string().optional(),
    score: z.string()
});

const Spec_Entity_ExecuteCommand = z.object({
    id: z.enum(['execute']),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_WritePayload.array(),
});

const Spec_Entity_Command = Spec_Entity_DeleteCommand.or(Spec_Entity_UpdateCommand).or(Spec_Entity_ExecuteCommand);

const Spec_Entity_Section = z.object({
    id: z.string(),
    name: z.string(),
    payloads: Spec_WritePayload.array()
});

const Spec_EntityList_CreateCommand = z.object({
    id: z.enum(['create']),
    endpoints: z.string().optional(),
    payloads: Spec_WritePayload.array()
});

const Spec_EntityList_ExecuteCommand = z.object({
    id: z.enum(['execute']),
    name: z.string(),
    endpoints: z.string().optional(),
    function: z.string().optional(),
    payloads: Spec_WritePayload.array()
});

const Spec_EntityList_Command = Spec_EntityList_CreateCommand.and(Spec_EntityList_ExecuteCommand);

const Spec_EntityList_ItemDisplay = z.object({
    fields: z.string().array(),
    format: z.string(),
});

const Spec_Entity = z.object({
    name: z.string(),
    single: z.object({
        commands: Spec_Entity_Command.array(),
        sections: Spec_Entity_Section.array(),
        endpoints: z.record(
            z.string(),
            z.object({
                name: z.string(),
            }),
        ).optional(),
    }).optional(),
    list: z.object({
        commands: Spec_EntityList_Command.array(),
        payloads: Spec_ReadPayload.array(),
        filters: z.object({
            field: z.string(),
            lowest: z.any().optional(),
            higest: z.any().optional(),
            allowRange: z.boolean().optional()
        }).array(),
        itemDisplay: Spec_EntityList_ItemDisplay,
    }).optional(),
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
export type Spec_Entity_Section = z.infer<typeof Spec_Entity_Section>;
export type Spec_Entity_Command = z.infer<typeof Spec_Entity_Command>;
export type Spec_EntityList_Command = z.infer<typeof Spec_EntityList_Command>;
export type Spec_EntityList_ItemDisplay = z.infer<typeof Spec_EntityList_ItemDisplay>;
