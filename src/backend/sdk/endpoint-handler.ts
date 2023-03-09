import { z } from "zod";

export const ListOptions = z.object({
    endpoint: z.string(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    filter_field: z.string().optional(),
    filter_value: z.string().optional(),
    sort_field: z.string().optional(),
});

export const GetOptions = z.object({
    endpoint: z.string(),
    id: z.string(),
});

export const ExecuteGlobalCommandOptions = z.object({
    endpoint: z.string(),
    command: z.string(),
    scope: z.string().optional(),
    payloads: z.any(),
});

export const ExecuteCreateCommandOptions = z.object({
    endpoint: z.string(),
    payloads: z.any(),
});

export const SuggestGlobalCommandInputOptions = z.object({
    endpoint: z.string(),
    payloadId: z.string(),
    payloads: z.any(),
});

export const ExecuteCommandOptions = z.object({
    endpoint: z.string(),
    id: z.string(),
    command: z.string(),
    scope: z.string().optional(),
    payloads: z.any(),
});

export const SuggestCommandInputOptions = z.object({
    endpoint: z.string(),
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

export abstract class EntityEndpointHandler<T> {
    abstract list(options: ListOptions): Promise<[items: T[], count: number]>;
    abstract get(options: GetOptions): Promise<T | null>;
    abstract executeGlobalCommand(options: ExecuteGlobalCommandOptions): Promise<void>;
    abstract executeCreateCommand(options: ExecuteCreateCommandOptions): Promise<T>;
    abstract suggestGlobalCommandInput(options: SuggestGlobalCommandInputOptions): Promise<T[]>;
    abstract executeCommand(options: ExecuteCommandOptions): Promise<T>;
    abstract suggestCommandInput(options: SuggestCommandInputOptions): Promise<T[]>;
}