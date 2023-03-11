import { Spec_WritePayload, TypeScheme, TypeSchemeType } from "../../../specs";

export type WritePayloadBuilders = { [section: string]: WritePayloadBuilder<never> };

export type WritePayloads<T extends WritePayloadBuilders> = {
    [I in keyof T]: WritePayload<T[I]>
};

export type WritePayload<T extends WritePayloadBuilder<unknown>> = T  extends WritePayloadBuilder<infer U > ? U: never;

// interface WritePayloadOptions {
//     name: string;
//     suffix?: string;
//     description?: string;
//     placeholder?: string;
//     suggestion?: 'full' | 'partial';
// }

export class WritePayloadBuilder<TValue> {
    _spec: Partial<Spec_WritePayload>;
    
    constructor() {
        this._spec = {};
    }

    static create() {
        return new WritePayloadBuilder();
    }

    name(val: string) {
        this._spec.name = val;
    }

    suffix(val?: string) {
        this._spec.suffix = val;
        return this;
    }

    description(val?: string) {
        this._spec.description = val;
        return this;
    }

    placeholder(val?: string) {
        this._spec.placeholder = val;
        return this;
    }

    suggestion(val?: 'full' | 'partial') {
        this._spec.suggestion = val;
        return this;
    }

    typeScheme<T extends { type: TValue } & TypeScheme>(value: T): WritePayloadBuilder<TypeSchemeType<T>> {
        this._spec.typeScheme = value;
        return this as WritePayloadBuilder<TypeSchemeType<T>>;
    }
}