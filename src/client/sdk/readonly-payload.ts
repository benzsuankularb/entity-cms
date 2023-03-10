import { TypeScheme } from '../../specs';
import { ReadEntity } from './entity';
import { PayloadField_Unknown } from './payload';

export interface ReadonlyPayloads {
    readonly fields: readonly PayloadField_Unknown[];
}

export interface ReadonlyPayloadField_Unknown {
    readonly name: string;
    readonly type: TypeScheme;
    toString(): number;
    toNumber(): number;
    toInteger(): number;
    toDate(): number;
    toBoolean(): boolean;
    toEntity(): ReadEntity;
}