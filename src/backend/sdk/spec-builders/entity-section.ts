import { Spec_Entity_Section } from "../../../common/specs";
import { Prettify } from "../../../utils/types";
import { SpecBuilder_WritePayloads, WritePayloads } from "./write-payload";

export type InferSpecBuilder_EntitySection<T extends SpecBuilder_EntitySection<object>> = T  extends SpecBuilder_EntitySection<infer U> ? U : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SpecBuilder_EntitySection<_TPayloads = object> {
    
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

    payloads<T extends SpecBuilder_WritePayloads>(builders: T): SpecBuilder_EntitySection<Prettify<WritePayloads<typeof builders>>> {
        this._payloads = { ...builders };
        return this as SpecBuilder_EntitySection<Prettify<WritePayloads<typeof builders>>>;
    }

}
