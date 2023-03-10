import { Entity_Command, Entity_Section } from "./command";
import { ReadonlyPayloads } from "./readonly-payload";

export interface Entity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    sections: Entity_Section[];
    commands: Entity_Command[];
}

export interface ReadEntity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    payloads: ReadonlyPayloads[];
    commands?: { name: string; command: string; scope?: string; }[];
    toString(): string;
}
