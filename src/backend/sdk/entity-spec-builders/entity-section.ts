import { Spec_Entity_Section } from "../../../specs";
import { WritePayloadBuilders, WritePayloads } from "./write-payload";

export type EntitySection<T extends EntitySectionBuilder<unknown, never>> = T  extends EntitySectionBuilder<infer U, never> ? U: never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EntitySectionBuilder<_TPayloads, _TOmit extends string> {

    _spec: Partial<Spec_Entity_Section>;
    _payloads: WritePayloadBuilders;
    
    static create() {
        return new EntitySectionBuilder<never, never>();
    }

    private constructor() {
        this._spec = {};
        this._payloads = {};
    }

    name(val: string):
        Omit<
            EntitySectionBuilder<_TPayloads, _TOmit | 'name'>,
            _TOmit | 'name'
        >
    {
        this._spec.name = val;
        return this as EntitySectionBuilder<_TPayloads, _TOmit | 'name'>;
    }

    payloads<T extends WritePayloadBuilders>(payloadBuilders: T):
        Omit<
            EntitySectionBuilder<WritePayloads<T>, _TOmit | 'payloads'>,
            _TOmit | 'payloads'
        >
    {
        this._payloads = { ...payloadBuilders };
        return this as EntitySectionBuilder<WritePayloads<T>, _TOmit | 'payloads'>;
    }

}
