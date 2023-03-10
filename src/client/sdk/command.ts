import { Payloads } from "./payloads";

export interface Entity_Section {
    id: string;
    name: string;
    payloads: Payloads;
    readOnly: boolean;
    update(): Promise<void>;
}

export interface Entity_Command {
    entityId: string;
    command: string;
    scope: string;
    name: string;
    payloads: Payloads;
    execute(): Promise<void>;
}

export interface EntityList_Command {
    command: string;
    scope: string;
    name: string;
    payloads: Payloads;
    execute(): Promise<void>;
}