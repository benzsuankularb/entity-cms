import { TypeScheme } from "../../../../common/specs";
import { EventEmitter } from "../../../../utils/event-emitter";
import { DeepReadonly } from "../../../../utils/types";
import { ReadEntity } from '../entity';

export interface PayloadField<T = unknown> {
    readonly onMetaUpdated: EventEmitter<PayloadFieldMeta>;
    readonly onValidatedUpdated: EventEmitter<boolean>;
    readonly onValueUpdated: EventEmitter<T>;
    
    readonly payloadId: string;
    readonly typeScheme: DeepReadonly<TypeScheme>;
    readonly meta: DeepReadonly<PayloadFieldMeta>;
    readonly validated: boolean;
    readonly value: T;
}

export interface PayloadField_Unknown extends PayloadField<unknown> {
    asString(): PayloadField_Primitive<string>;
    asNumber(): PayloadField_Primitive<number>;
    asInteger(): PayloadField_Primitive<number>;
    asDate(): PayloadField_Primitive<number>;
    asBoolean(): PayloadField_Primitive<boolean>;
    asBinary(): PayloadField_Binary;
    asEntity(): PayloadField_Entity;
}

export interface PayloadField_Primitive<T> extends PayloadField<T> {
    setValue(val: T): void;
    suggest(): Promise<T[]>;
}

export interface PayloadField_Binary extends PayloadField<string | undefined> {
    upload(file: File): Promise<void>;
    download(): Promise<void>;
}

export interface PayloadField_Entity extends PayloadField<ReadEntity | undefined>  {
    setValueFromSuggestion(val: string): void;
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


