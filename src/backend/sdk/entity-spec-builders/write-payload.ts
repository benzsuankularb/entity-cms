import { Spec_WritePayload, TypeScheme, TypeSchemeType } from "../../../specs";

export type WritePayloads<T extends { [section: string]: WritePayloadBuilder<never> }> = {
    [I in keyof T]: WritePayload<T[I]>
};

export type WritePayload<T extends WritePayloadBuilder<unknown>> = T  extends WritePayloadBuilder<infer U > ? U: never;

export function writePayload(options: WritePayloadOptions) {
    return new WritePayloadBuilder(options);
}

interface WritePayloadOptions {
    name: string;
    suffix?: string;
    description?: string;
    placeholder?: string;
    suggestion?: 'full' | 'partial';
}

export class WritePayloadBuilder<TValue> {
    _spec: Partial<Spec_WritePayload>;
    
    constructor(options: WritePayloadOptions) {
        this._spec = { ...options }
    }

    typeScheme<T extends { type: TValue } & TypeScheme>(value: T): WritePayloadBuilder<TypeSchemeType<T>> {
        this._spec.typeScheme = value;
        return this as WritePayloadBuilder<TypeSchemeType<T>>;
    }
}