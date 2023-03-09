import { EntityCommand, EntitySection } from "./command";

export interface Entity {
    id: string;
    created?: number | boolean;
    deleted?: number | boolean;
    sections: EntitySection[];
    commands: EntityCommand[];
}
