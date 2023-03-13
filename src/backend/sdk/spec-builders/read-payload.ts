import { Prettify } from "../../../client/utils/types";
import { InferTypeScheme, Spec_ReadPayload, TypeScheme } from "../../../common/specs";

export type ReadPayloads<T extends SpecBuilder_ReadPayloads> = {
    [I in keyof T]: ReadPayload<T[I]>
};

export type SpecBuilder_ReadPayloads = { [section: string]: SpecBuilder_ReadPayload<unknown> };

export type ReadPayload<T> = T extends SpecBuilder_ReadPayload<infer U> ? U : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SpecBuilder_ReadPayload<_TValue = unknown> {
    
    _type = 'read-payload';
    _spec: Partial<Spec_ReadPayload>;

    constructor() {
        this._spec = { }
    }

    name(val: string) {
        this._spec.name = val;
        return this;
    }

    typeScheme<T extends TypeScheme>(value: T): SpecBuilder_ReadPayload<Prettify<InferTypeScheme<T>>> {
        this._spec.typeScheme = value;
        return this as SpecBuilder_ReadPayload<Prettify<InferTypeScheme<T>>>;
    }
}