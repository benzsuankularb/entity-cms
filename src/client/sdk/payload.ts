import { TypeScheme } from "../../specs";

export interface Payloads {
    fields: PayloadField[];
    validated: boolean;
}

export interface PayloadField {
    onUpdated: () => void;
    id: string;
    name: string;
    readOnly: boolean;
    hidden: boolean;
    validated: boolean;
    required: boolean;
    typeScheme: TypeScheme;
    value: PayloadValue<unknown>;
    suggestion: 'disabled' | 'full' | 'partial';
}

export interface PayloadValue<TValue> {
    get(): Promise<TValue>;
    set(value: TValue): Promise<void>;
    suggest(): Promise<TValue[]>;
}
