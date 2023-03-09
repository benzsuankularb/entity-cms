import { PayloadsInternal } from "./payload/payloads";

export interface EntitySection {
    id: string;
    name: string;
    payloads: PayloadsInternal;
    readOnly: boolean;
    update(): Promise<void>;
}

export interface EntityGlobalCommand {
    command: string;
    scope: string;
    name: string;
    payloads: PayloadsInternal;
    execute(): Promise<void>;
}

export interface EntityCommand {
    entityId: string;
    command: string;
    scope: string;
    name: string;
    payloads: PayloadsInternal;
    execute(): Promise<void>;
}