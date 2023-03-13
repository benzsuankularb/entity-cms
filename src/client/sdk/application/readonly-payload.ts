import { TypeScheme } from '../../../common/specs';
import { ReadEntity } from './entity';

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