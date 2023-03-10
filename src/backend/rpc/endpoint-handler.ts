import { z } from "zod";

export const QueryReadEntitiesOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    filter_field: z.string().optional(),
    filter_value: z.string().optional(),
    sort_field: z.string().optional(),
});

export const GetWriteEntityOptions = z.object({
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
});

export const ExecuteListCommandOptions = z.object({
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

export const SuggestListCommandInputOptions = z.object({
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

export type QueryReadEntitiesOptions = z.infer<typeof QueryReadEntitiesOptions>;
export type GetWriteEntityOptions = z.infer<typeof GetWriteEntityOptions>;
export type ExecuteListCommandOptions = z.infer<typeof ExecuteListCommandOptions>;
export type ExecuteCreateCommandOptions = z.infer<typeof ExecuteCreateCommandOptions>;
export type SuggestListCommandInputOptions = z.infer<typeof SuggestListCommandInputOptions>;
export type ExecuteCommandOptions = z.infer<typeof ExecuteCommandOptions>;
export type SuggestCommandInputOptions = z.infer<typeof SuggestCommandInputOptions>;

export abstract class EntityEndpointHandler {
    abstract queryReadEntities(options: QueryReadEntitiesOptions): Promise<[items: string[], count: number, embededEntities: { [entity: string]: unknown }]>;
    abstract getWriteEntity(options: GetWriteEntityOptions): Promise<unknown | null>;
    abstract executeListCommand(options: ExecuteListCommandOptions): Promise<void>;
    abstract executeCreateCommand(options: ExecuteCreateCommandOptions): Promise<unknown>;
    abstract suggestListCommandInput(options: SuggestListCommandInputOptions): Promise<unknown[]>;
    abstract executeCommand(options: ExecuteCommandOptions): Promise<unknown>;
    abstract suggestCommandInput(options: SuggestCommandInputOptions): Promise<unknown[]>;
}