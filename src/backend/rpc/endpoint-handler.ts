import { z } from "zod";


export const ListOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    filter_field: z.string().optional(),
    filter_value: z.string().optional(),
    sort_field: z.string().optional(),
});

export const GetOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
});

export const ExecuteGlobalCommandOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    command: z.string(),
    scope: z.string().optional(),
    payloads: z.any(),
});

export const ExecuteCreateCommandOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    payloads: z.any(),
});

export const SuggestGlobalCommandInputOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    payloadId: z.string(),
    payloads: z.any(),
});

export const ExecuteCommandOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
    command: z.string(),
    scope: z.string().optional(),
    payloads: z.any(),
});

export const SuggestCommandInputOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
    payloadId: z.string(),
    payloads: z.any(),
});

export type ListOptions = z.infer<typeof ListOptions>;
export type GetOptions = z.infer<typeof GetOptions>;
export type ExecuteGlobalCommandOptions = z.infer<typeof ExecuteGlobalCommandOptions>;
export type ExecuteCreateCommandOptions = z.infer<typeof ExecuteCreateCommandOptions>;
export type SuggestGlobalCommandInputOptions = z.infer<typeof SuggestGlobalCommandInputOptions>;
export type ExecuteCommandOptions = z.infer<typeof ExecuteCommandOptions>;
export type SuggestCommandInputOptions = z.infer<typeof SuggestCommandInputOptions>;

export abstract class EntityEndpointHandler {
    abstract list(options: ListOptions): Promise<[items: string[], count: number, embededEntities: { [entity: string]: unknown }]>;
    abstract get(options: GetOptions): Promise<unknown | null>;
    abstract executeGlobalCommand(options: ExecuteGlobalCommandOptions): Promise<void>;
    abstract executeCreateCommand(options: ExecuteCreateCommandOptions): Promise<unknown>;
    abstract suggestGlobalCommandInput(options: SuggestGlobalCommandInputOptions): Promise<unknown[]>;
    abstract executeCommand(options: ExecuteCommandOptions): Promise<unknown>;
    abstract suggestCommandInput(options: SuggestCommandInputOptions): Promise<unknown[]>;
}