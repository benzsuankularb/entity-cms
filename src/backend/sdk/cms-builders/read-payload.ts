import { InferTypeScheme, Spec_ReadPayload, TypeScheme } from "../../../specs";

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
    readonly spec: Partial<Spec_ReadPayload>;
    
    constructor(options: ReadPayloadOptions) {
        this.spec = { ...options }
    }

    typeScheme<T extends { type: TValue } & TypeScheme>(value: T): ReadPayloadBuilder<InferTypeScheme<T>> {
        this.spec.typeScheme = value;
        return this as ReadPayloadBuilder<InferTypeScheme<T>>;
    }
}