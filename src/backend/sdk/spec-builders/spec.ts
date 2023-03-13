import { Spec_Root } from "../../../specs";
import { SpecBuilderContextTypes } from "./context";
import { SpecBuilder_Entity } from "./entity";
import { SpecBuilder_MenuItem } from "./menu-item";

export class SpecBuilder_Spec<TContext extends SpecBuilderContextTypes> {

    _type = 'spec';
    _spec: Partial<Spec_Root>;
    _menuSpecBuilder?: SpecBuilder_MenuItem<TContext>;
    _entitySpecBuilders: SpecBuilder_Entity<TContext>[];
    
    constructor() {
        this._spec = {};
        this._entitySpecBuilders = [];
    }

    menu(builder: SpecBuilder_MenuItem<TContext>) {
        this._menuSpecBuilder = builder
        return this;
    }

    entity(...entities: SpecBuilder_Entity<TContext>[]): this {
        this._entitySpecBuilders = [...entities]
        return this;
    }
}