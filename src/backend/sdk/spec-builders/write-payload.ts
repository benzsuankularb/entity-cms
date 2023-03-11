import { InferTypeScheme, Spec_WritePayload, TypeScheme } from "../../../specs";

export type WritePayloads<T extends SpecBuilder_WritePayloads> = {
    [I in keyof T]: WritePayload<T[I]>
};

export type WritePayload<T extends SpecBuilder_WritePayload<unknown>> = T  extends SpecBuilder_WritePayload<infer U> ? U: never;

export type SpecBuilder_WritePayloads = { [section: string]: SpecBuilder_WritePayload<never> };


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SpecBuilder_WritePayload<_TValue = unknown> {
    
    _type = 'write-payload';
    _spec: Partial<Spec_WritePayload>;
    
    constructor() {
        this._spec = {};
    }

    name(val: string) {
        this._spec.name = val;
        return this;
    }

    suffix(val: string) {
        this._spec.suffix = val;
        return this;
    }

    description(val: string) {
        this._spec.description = val;
        return this;
    }

    placeholder(val: string) {
        this._spec.placeholder = val;
        return this;
    }

    suggestion(val: 'full' | 'partial') {
        this._spec.suggestion = val;
        return this;
    }

    typeScheme<T extends TypeScheme>(value: T): SpecBuilder_WritePayload<InferTypeScheme<T>> {
        this._spec.typeScheme = value;
        return this as SpecBuilder_WritePayload<InferTypeScheme<T>>;
    }
}