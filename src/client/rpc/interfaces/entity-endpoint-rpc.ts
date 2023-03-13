import type { ExecuteCommand, ExecuteCommandOptions, ExecuteGlobalCommandOptions, ExecuteGlobalCommandResponse, GetEntityOptions, GetEntityResposne, QueryReadEntitiesOptions, QueryReadEntitiesResponse, SuggestCommandInputOptions, SuggestCommandInputResponse, SuggestGlobalCommandInputOptions, SuggestGlobalCommandInputResponse } from "../../../backend/rpc/app-rpc";

export interface EntityEndpointRpc {
    queryReadEntities(options: QueryReadEntitiesOptions): Promise<QueryReadEntitiesResponse>;
    getEntity(options: GetEntityOptions): Promise<GetEntityResposne>;
    executeGlobalCommand(options: ExecuteGlobalCommandOptions): Promise<ExecuteGlobalCommandResponse>;
    suggestGlobalCommandInput(options: SuggestGlobalCommandInputOptions): Promise<SuggestGlobalCommandInputResponse>;
    executeCommand(options: ExecuteCommandOptions): Promise<ExecuteCommand>;
    suggestCommandInput(options: SuggestCommandInputOptions): Promise<SuggestCommandInputResponse>;
}