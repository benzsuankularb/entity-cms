import { Spec_ReadPayload, TypeScheme, TypeSchemeType } from "../../../specs";

export type ReadPayloads<T extends { [section: string]: ReadPayloadBuilder<never> }> = {
    [I in keyof T]: ReadPayload<T[I]>
};

export type ReadPayload<T extends ReadPayloadBuilder<unknown>> = T  extends ReadPayloadBuilder<infer U > ? U: never;

export class ReadPayloadBuilder<TValue> {
    _spec: Partial<Spec_ReadPayload>;
    
    private constructor() {
        this._spec = { }
    }

    static create() {
        return new ReadPayloadBuilder();
    }

    name(val: string) {
        this._spec.name = val;
    }

    typeScheme<T extends { type: TValue } & TypeScheme>(value: T): ReadPayloadBuilder<TypeSchemeType<T>> {
        this._spec.typeScheme = value;
        return this as ReadPayloadBuilder<TypeSchemeType<T>>;
    }
}