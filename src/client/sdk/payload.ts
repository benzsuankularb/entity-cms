import _ from 'lodash';
import { TypeScheme } from "../../common/specs";
import { EventEmitter } from "../utils/event-emitter";
import { DeepReadonly } from "../utils/types";
import { EntityCMSContext } from "./common";
import { ReadEntity } from './entity';
import { PayloadsInternal } from "./payloads";

export interface PayloadField<T = unknown> {
    readonly onMetaUpdated: EventEmitter<PayloadFieldMeta>;
    readonly onValidatedUpdated: EventEmitter<boolean>;
    readonly onValueUpdated: EventEmitter<T>;
    readonly id: string;
    readonly typeScheme: DeepReadonly<TypeScheme>;
    readonly meta: DeepReadonly<PayloadFieldMeta>;
    readonly validated: boolean;
    readonly value: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PayloadField_Any extends PayloadField<any> {
    asString(): PayloadField_Value<string>;
    asNumber(): PayloadField_Value<number>;
    asInteger(): PayloadField_Value<number>;
    asDate(): PayloadField_Value<number>;
    asBoolean(): PayloadField_Value<boolean>;
    asBinary(): PayloadField_Binary;
    asEntity(): PayloadField_Entity;
}

export interface PayloadField_Value<T> extends PayloadField<T> {
    update(val: T): void;
    suggest(): Promise<T[]>;
}

export interface PayloadField_Binary extends PayloadField<string> {
    upload(val: FormData): void;
    download(): Promise<void>;
}

export interface PayloadField_Entity extends PayloadField<string>  {
    readonly valueReadEntity: ReadEntity;
    update(entityId: string): Promise<void>;
    suggest(): Promise<ReadEntity[]>;
}

export interface PayloadFieldMeta {
    name: string;
    suffix?: string;
    description?: string;
    placeholder?: string;
    readOnly: boolean;
    hidden: boolean;
    suggestion?: 'full' | 'partial';
}

export interface PayloadFieldInternalOptions<T> {
    parent: PayloadsInternal;
    id: string;
    typeScheme: TypeScheme;
    meta: PayloadFieldMeta;
    context: EntityCMSContext;
    initialValue: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class PayloadFieldInternal<T = any> implements PayloadField<T> {
    readonly onMetaUpdated: EventEmitter<PayloadFieldMeta>;
    readonly onValidatedUpdated: EventEmitter<boolean>;
    readonly onValueUpdated: EventEmitter<T>;
    
    readonly context: EntityCMSContext;
    readonly parent: PayloadsInternal;
    readonly id: string;
    readonly typeScheme: TypeScheme;
    meta: PayloadFieldMeta;
    validated: boolean;
    value: T;

    constructor(options: PayloadFieldInternalOptions<T>) {
        this.onMetaUpdated = new EventEmitter<PayloadFieldMeta>();
        this.onValidatedUpdated = new EventEmitter<boolean>();
        this.onValueUpdated = new EventEmitter<T>();
        
        this.context = options.context;
        this.parent = options.parent;
        this.id = options.id;
        this.typeScheme = options.typeScheme;
        this.meta = options.meta;
        this.value = options.initialValue;
        this.validated = false;
    }

    asString(): PayloadField_Value<string> {
        if (this.typeScheme.type !== 'string') {
            throw 'field type must be string';
        }
        return this as unknown as PayloadField_Value<string>;
    }

    asNumber(): PayloadField_Value<number> {
        if (this.typeScheme.type !== 'number') {
            throw 'field type must be number';
        }
        return this as unknown as PayloadField_Value<number>;
    }

    asInteger(): PayloadField_Value<number> {
        if (this.typeScheme.type !== 'integer') {
            throw 'field type must be integer';
        }
        return this as unknown as PayloadField_Value<number>;
    }

    asDate(): PayloadField_Value<number> {
        if (this.typeScheme.type !== 'number') {
            throw 'field type must be number';
        }
        return this as unknown as PayloadField_Value<number>;
    }
    
    asBoolean(): PayloadField_Value<boolean> {
        if (this.typeScheme.type !== 'boolean') {
            throw 'field type must be bool';
        }
        return this as unknown as PayloadField_Value<boolean>;
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

    setValue(val: T) {
        if (_.isEqual(this.value, val)) {
            return;
        }

        this.value = val;
        this.onValueUpdated.invoke(val);
    }

    setMeta(val: PayloadFieldMeta) {
        if (_.isEqual(this.meta, val)) {
            return;
        }
        
        this.meta = val;
        this.onMetaUpdated.invoke(val);
    }

    setValidated(val: boolean) {
        if (this.validated === val) {
            return;
        }

        this.validated = true;
        this.onValidatedUpdated.invoke(val);
    }
    
}

export class PayloadFieldInternal_Value<T> extends PayloadFieldInternal<T> implements PayloadField_Value<T> {
    update(val: T) {
        this.setValue(val);
    }

    async suggest(): Promise<T[]> {
        if (!this.meta.suggestion) {
            throw 'suggest() cannot be called in non-suggestable field';
        }

        // TODO call api
        return [];
    }
}

export class PayloadFieldInternal_Binary extends PayloadFieldInternal<string> implements PayloadField_Binary {
    upload(data: FormData): void {
        throw new Error("Method not implemented.");
    }

    download(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export class PayloadFieldInternal_Entity extends PayloadFieldInternal<string> implements PayloadField_Entity {

    embededEntities: { [id: string]: ReadEntity };
    valueReadEntity: ReadEntity;

    constructor(options: PayloadFieldInternalOptions<string> & { initialValue: ReadEntity }) {
        super({
            ...options,
            initialValue: options.initialValue.id
        });
        this.valueReadEntity = options.initialValue;
        this.embededEntities = {};
    }

    async update(entityId: string): Promise<void> {
        this.setValue(entityId);
    }
    
    suggest(): Promise<ReadEntity[]> {
        throw new Error('Method not implemented.');
    }
}
