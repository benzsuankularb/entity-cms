import _ from 'lodash';
import { TypeScheme } from "../../../../../common/specs";
import { EventEmitter } from "../../../../../utils/event-emitter";
import { ApplicationContext } from "../../context";
import { Payloads } from "../../payloads";
import { PayloadField, PayloadFieldMeta, PayloadField_Binary, PayloadField_Entity, PayloadField_Primitive } from '../interfaces';

export interface PayloadFieldInternalOptions<T> {
    context: ApplicationContext;
    parent: Payloads;
    payloadId: string;
    typeScheme: TypeScheme;
    meta: PayloadFieldMeta;
    initialValue: T;
}

export abstract class PayloadFieldInternal<T> implements PayloadField<T> {

    readonly onMetaUpdated: EventEmitter<PayloadFieldMeta>;
    readonly onValidatedUpdated: EventEmitter<boolean>;
    readonly onValueUpdated: EventEmitter<T>;

    private readonly _context: ApplicationContext;
    private readonly _parent: Payloads;

    private _meta: PayloadFieldMeta;
    private _value: T;
    private _validated: boolean;

    readonly typeScheme: TypeScheme;
    readonly payloadId: string;

    get meta(): PayloadFieldMeta {
        return this._meta;
    }

    get value(): T {
        return this._value;
    }

    get validated(): boolean {
        return this._validated;
    }

    constructor(options: PayloadFieldInternalOptions<T>) {
        this.onMetaUpdated = new EventEmitter<PayloadFieldMeta>();
        this.onValidatedUpdated = new EventEmitter<boolean>();
        this.onValueUpdated = new EventEmitter<T>();

        this._context = options.context;
        this._parent = options.parent;
        this.payloadId = options.payloadId;
        this.typeScheme = options.typeScheme;

        this._meta = options.meta;
        this._value = options.initialValue;
        this._validated = false;
    }

    setValue(val: T) {
        if (_.isEqual(this.value, val)) {
            return;
        }

        this._value = val;
        this.onValueUpdated.invoke(val);
    }
    setMeta(val: PayloadFieldMeta) {
        if (_.isEqual(this.meta, val)) {
            return;
        }

        this._meta = val;
        this.onMetaUpdated.invoke(val);
    }

    setValidated(val: boolean) {
        if (this.validated === val) {
            return;
        }

        this._validated = true;
        this.onValidatedUpdated.invoke(val);
    }

    // Below are type cast functions
    asString(): PayloadField_Primitive<string> {
        if (this.typeScheme.type !== 'string') {
            throw 'field type must be string';
        }
        return this as unknown as PayloadField_Primitive<string>;
    }

    asNumber(): PayloadField_Primitive<number> {
        if (this.typeScheme.type !== 'number') {
            throw 'field type must be number';
        }
        return this as unknown as PayloadField_Primitive<number>;
    }

    asInteger(): PayloadField_Primitive<number> {
        if (this.typeScheme.type !== 'integer') {
            throw 'field type must be integer';
        }
        return this as unknown as PayloadField_Primitive<number>;
    }

    asDate(): PayloadField_Primitive<number> {
        if (this.typeScheme.type !== 'number') {
            throw 'field type must be number';
        }
        return this as unknown as PayloadField_Primitive<number>;
    }

    asBoolean(): PayloadField_Primitive<boolean> {
        if (this.typeScheme.type !== 'boolean') {
            throw 'field type must be bool';
        }
        return this as unknown as PayloadField_Primitive<boolean>;
    }

    asBinary(): PayloadField_Binary {
        if (this.typeScheme.type !== 'binary') {
            throw 'field type must be binary';
        }
        return this as unknown as PayloadField_Binary;
    }

    asEntity(): PayloadField_Entity {
        if (this.typeScheme.type !== 'entity') {
            throw 'field type must be entity';
        }
        return this as unknown as PayloadField_Entity;
    }
}
