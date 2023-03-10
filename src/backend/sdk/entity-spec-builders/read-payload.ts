import { Spec_ReadPayload, TypeScheme, TypeSchemeType } from "../../../specs";

export type ReadPayloads<T extends { [section: string]: ReadPayloadBuilder<never> }> = {
    [I in keyof T]: ReadPayload<T[I]>
};

export type ReadPayload<T extends ReadPayloadBuilder<unknown>> = T  extends ReadPayloadBuilder<infer U > ? U: never;

export function readPayload(options: ReadPayloadOptions) {
    return new ReadPayloadBuilder(options);
}

interface ReadPayloadOptions {
    name: string;
}

export class ReadPayloadBuilder<TValue> {
    _spec: Partial<Spec_ReadPayload>;
    
    constructor(options: ReadPayloadOptions) {
        this._spec = { ...options }
    }

    typeScheme<T extends { type: TValue } & TypeScheme>(value: T): ReadPayloadBuilder<TypeSchemeType<T>> {
        this._spec.typeScheme = value;
        return this as ReadPayloadBuilder<TypeSchemeType<T>>;
    }
}