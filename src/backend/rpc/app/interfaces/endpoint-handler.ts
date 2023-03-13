import { z } from "zod";

export const QueryReadEntitiesOptions = z.object({
    authentication: z.string().optional(),
    entityId: z.string(),
    endpoint: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    filter_field: z.string().optional(),
    filter_value: z.string().optional(),
    sort_field: z.string().optional(),
});

export const GetEntityOptions = z.object({
    authentication: z.string().optional(),
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
});

export const ExecuteGlobalCommandOptions = z.object({
    authentication: z.string().optional(),
    entityId: z.string(),
    endpoint: z.string().optional(),
    command: z.string(),
    scope: z.string().optional(),
    payloads: z.any(),
});

export const ExecuteCreateCommandOptions = z.object({
    authentication: z.string().optional(),
    entityId: z.string(),
    endpoint: z.string().optional(),
    payloads: z.any(),
});

export const SuggestGlobalCommandInputOptions = z.object({
    authentication: z.string().optional(),
    entityId: z.string(),
    endpoint: z.string().optional(),
    payloadId: z.string(),
    payloads: z.any(),
});

export const ExecuteCommandOptions = z.object({
    authentication: z.string().optional(),
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
    command: z.string(),
    scope: z.string().optional(),
    payloads: z.any(),
});

export const SuggestCommandInputOptions = z.object({
    authentication: z.string().optional(),
    entityId: z.string(),
    endpoint: z.string().optional(),
    id: z.string(),
    payloadId: z.string(),
    payloads: z.any(),
});

export interface Entity {
    id: string;
    createdTime?: number | boolean;
    deletedTime?: number | boolean;
    commands: { command: string; scope?: string; }[];
    [section: string]: unknown;
}

export interface ReadEntity {
    id: string;
    createdTime?: number | boolean;
    deletedTime?: number | boolean;
    commands: { command: string; scope?: string; }[];
    [section: string]: unknown;
}

export type QueryReadEntitiesOptions = z.infer<typeof QueryReadEntitiesOptions>;
export type GetEntityOptions = z.infer<typeof GetEntityOptions>;
export type ExecuteGlobalCommandOptions = z.infer<typeof ExecuteGlobalCommandOptions>;
export type SuggestGlobalCommandInputOptions = z.infer<typeof SuggestGlobalCommandInputOptions>;
export type ExecuteCreateCommandOptions = z.infer<typeof ExecuteCreateCommandOptions>;
export type ExecuteCommandOptions = z.infer<typeof ExecuteCommandOptions>;
export type SuggestCommandInputOptions = z.infer<typeof SuggestCommandInputOptions>;

export interface RpcEntityEndpointHandler {
    queryReadEntities(options: QueryReadEntitiesOptions): Promise<{
        items: ReadEntity[],
        count: number,
        embededEntities: { [entity: string]: { [id: string]: ReadEntity } }
    }>;
    
    getEntity(options: GetEntityOptions): Promise<{
        entity: Entity | null,
        embededEntities: { [entity: string]: { [id: string]: ReadEntity } } 
    }>;

    executeGlobalCommand(options: ExecuteGlobalCommandOptions): Promise<{
        success: boolean,
        newEntityId?: string
    }>;

    suggestGlobalCommandInput(options: SuggestGlobalCommandInputOptions): Promise<{
        items: unknown[];
    }>;

    executeCommand(options: ExecuteCommandOptions): Promise<{
        success: boolean;
    }>;
    
    suggestCommandInput(options: SuggestCommandInputOptions): Promise<{
        items: unknown[];
    }>;
}