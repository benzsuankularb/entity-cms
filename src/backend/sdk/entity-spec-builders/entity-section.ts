import { Spec_Entity_Section } from "../../../specs";
import { WritePayloadBuilder, WritePayloads } from "./write-payload";

export type EntitySection<T extends EntitySectionBuilder<unknown>> = T  extends EntitySectionBuilder<infer U > ? U: never;

export function entitySection(options: EntitySectionBuilderOptions) {
    return new EntitySectionBuilder(options);
}

interface EntitySectionBuilderOptions {
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EntitySectionBuilder<_> {

    _spec: Partial<Spec_Entity_Section>;
    _payloads: { [section: string]: WritePayloadBuilder<never> };
    
    constructor(options: EntitySectionBuilderOptions) {
        this._spec = { ...options };
        this._payloads = {};
    }

    payloads<T extends { [section: string]: WritePayloadBuilder<never> }>(payloadBuilders: T): EntitySectionBuilder<WritePayloads<T>> {
        this._payloads = { ...payloadBuilders };
        return this as EntitySectionBuilder<WritePayloads<T>>;
    }

}
