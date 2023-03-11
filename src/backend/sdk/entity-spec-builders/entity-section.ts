import { Spec_Entity_Section } from "../../../specs";
import { WritePayloadBuilders, WritePayloads } from "./write-payload";

export type EntitySection<T extends EntitySectionBuilder<unknown>> = T  extends EntitySectionBuilder<infer U > ? U: never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EntitySectionBuilder<_> {

    _spec: Partial<Spec_Entity_Section>;
    _payloads: WritePayloadBuilders;
    
    static create() {
        return new EntitySectionBuilder();
    }

    private constructor() {
        this._spec = {};
        this._payloads = {};
    }

    name(val: string): this {
        this._spec.name = val;
        return this;
    }

    payloads<T extends WritePayloadBuilders>(payloadBuilders: T): EntitySectionBuilder<WritePayloads<T>> {
        this._payloads = { ...payloadBuilders };
        return this as EntitySectionBuilder<WritePayloads<T>>;
    }

}
