import { TypeScheme } from "../common/specs";

export interface Payloads {
    validate(): boolean;
}

export interface PayloadField {
    id: string;
    name: string;
    readOnly: boolean;
    hidden: boolean;
    validated: boolean;
    required: boolean;
    value: PayloadValue<unknown>;
    suggestion: 'disabled' | 'full' | 'partial';
}

export interface PayloadValue<TValue> {
    typeScheme: TypeScheme;
    get(): Promise<TValue>;
    set(value: TValue): Promise<void>;
    suggest(): Promise<TValue>;
}
