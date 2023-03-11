import { Spec_Entity_Section } from "../../../specs";
import { SpecBuilder_WritePayloads, WritePayloads } from "./write-payload";

export type EntitySection<T extends SpecBuilder_EntitySection<unknown>> = T  extends SpecBuilder_EntitySection<infer U> ? U: never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SpecBuilder_EntitySection<_TPayloads> {
    
    _type = 'entity-section';
    _spec: Partial<Spec_Entity_Section>;
    _payloads: SpecBuilder_WritePayloads;

    constructor() {
        this._spec = {};
        this._payloads = {};
    }

    name(val: string) {
        this._spec.name = val;
        return this;
    }

    payloads<T extends SpecBuilder_WritePayloads>(payloadBuilders: T): SpecBuilder_EntitySection<WritePayloads<T>> {
        this._payloads = { ...payloadBuilders };
        return this as SpecBuilder_EntitySection<WritePayloads<T>>;
    }

}
