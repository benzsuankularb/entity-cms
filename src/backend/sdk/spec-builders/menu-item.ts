import { Spec_MenuItem } from "../../../specs";
import { SpecBuilderContextTypes } from "./context";

export class SpecBuilder_MenuItem<TContext extends SpecBuilderContextTypes> {

    _type = 'menu-item';
    _spec: Partial<Spec_MenuItem>;
    _itemSpecBuilders: SpecBuilder_MenuItem<TContext>[];

    constructor() {
        this._spec = {};
        this._itemSpecBuilders = [];
    }

    name(val: string) {
        this._spec.name = val;
        return this;
    }

    endpoint(entity: string, endpoint?: string) {
        this._spec.endpoint = { entity, endpoint };
        return this;
    }

    items(builders: SpecBuilder_MenuItem<TContext>[]) {
        this._itemSpecBuilders = builders;
        return this;
    }

}