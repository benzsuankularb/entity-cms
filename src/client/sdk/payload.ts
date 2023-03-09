import * as _ from 'lodash';
import { TypeScheme } from "../../specs";
import { EventEmitter } from "../utils/event";
import { DeepReadonly } from "../utils/types";
import { EmbededEntity, EntityCMSContext } from "./common";
import { PayloadsInternal } from "./payloads";

export interface PayloadField<T> {
    readonly onMetaUpdated: EventEmitter;
    readonly onValueUpdated: EventEmitter;
    readonly id: string;
    readonly typeScheme: DeepReadonly<TypeScheme>;
    readonly meta: DeepReadonly<PayloadFieldMeta>;
    readonly validated: boolean;
    readonly value: T;
}

export interface PayloadField_Unknown extends PayloadField<unknown> {
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
    readonly valueEmbededEntity: EmbededEntity;
    getEmbededEntity(id: string): EmbededEntity | undefined;
    suggest(): Promise<EmbededEntity[]>;
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

export abstract class PayloadFieldInternal<T> implements PayloadField_Unknown {
    readonly onMetaUpdated: EventEmitter;
    readonly onValidatedUpdated: EventEmitter;
    readonly onValueUpdated: EventEmitter;
    
    readonly context: EntityCMSContext;
    readonly parent: PayloadsInternal;
    readonly id: string;
    readonly typeScheme: TypeScheme;
    meta: PayloadFieldMeta;
    validated: boolean;
    value: T;

    constructor(options: PayloadFieldInternalOptions<T>) {
        this.onMetaUpdated = new EventEmitter();
        this.onValidatedUpdated = new EventEmitter();
        this.onValueUpdated = new EventEmitter();
        
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

    setValue(value: T) {
        if (_.isEqual(this.value, value)) {
            return;
        }

        this.value = value;
        this.onValueUpdated.invoke();
    }

    setMeta(value: PayloadFieldMeta) {
        if (_.isEqual(this.meta, value)) {
            return;
        }
        
        this.meta = value;
        this.onMetaUpdated.invoke();
    }

    setValidated(value: boolean) {
        if (this.validated === value) {
            return;
        }

        this.validated = true;
        this.onValidatedUpdated.invoke();
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

    embededEntities: { [id: string]: EmbededEntity };
    valueEmbededEntity: EmbededEntity;

    constructor(options: PayloadFieldInternalOptions<string> & { initialValue: EmbededEntity }) {
        super({
            ...options,
            initialValue: options.initialValue.id
        });
        this.valueEmbededEntity = options.initialValue;
        this.embededEntities = {};
    }

    getEmbededEntity(id: string): EmbededEntity | undefined {
        return this.embededEntities[id];
    }
    
    suggest(): Promise<EmbededEntity[]> {
        throw new Error('Method not implemented.');
    }
}
