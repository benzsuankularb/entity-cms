import { TypeScheme } from '../../common/specs';
import { ReadEntity } from './entity';
import { PayloadField_Any } from './payload';

export interface ReadonlyPayloads {
    readonly fields: readonly PayloadField_Any[];
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