import { Spec_Entity } from "../../../specs";
import { createSpecBuilderActionsContext, ReplaceField, SpecBuilderActionsContext, SpecBuilderContextTypes } from "./context";
import { SpecBuilder_EntityAction } from "./entity-actions/entity-action";
import { SpecBuilder_EntitySection } from "./entity-section";
import { ReadPayloads, SpecBuilder_ReadPayloads } from "./read-payload";

type SpecBuilder_EntitySections = { [section: string]: SpecBuilder_EntitySection<unknown> };

export type EntitySections<T extends SpecBuilder_EntitySections> = {
    [I in keyof T]: T[I]
}

export class SpecBuilder_Entity<TContext extends SpecBuilderContextTypes>{

    _type = 'entity';
    _id: string;
    _spec: Partial<Spec_Entity>;
    _entity: SpecBuilder_EntitySections;
    _readEntity: SpecBuilder_ReadPayloads;
    _commands: { [id: string]: SpecBuilder_EntityAction<TContext> };
    _globalCommands: { [id: string]: SpecBuilder_EntityAction<TContext> };
    _queries: { [id: string]: SpecBuilder_EntityAction<TContext> };

    constructor(id: string) {
        this._id = id;
        this._spec = { };
        this._entity = {};
        this._readEntity = {};
        this._commands = {};
        this._globalCommands = {};
        this._queries = {};
    }

    name(val: string) {
        this._spec.name = val;
        return this;
    }
    
    singleton() {
        this._spec.singleton = true;
        return this;
    }

    sections<TSpecBuilders extends SpecBuilder_EntitySections>(sections: TSpecBuilders): SpecBuilder_Entity<ReplaceField<TContext, '_entity', EntitySections<TSpecBuilders>>> {
        this._entity = sections;
        return this as SpecBuilder_Entity<ReplaceField<TContext, '_entity', EntitySections<TSpecBuilders>>>;
    }

    readEntity<TSpecBuilders extends SpecBuilder_ReadPayloads>(payloads: TSpecBuilders): SpecBuilder_Entity<ReplaceField<TContext, '_read_entity', ReadPayloads<TSpecBuilders>>> {
        this._readEntity = payloads;
        return this as SpecBuilder_Entity<ReplaceField<TContext, '_read_entity', ReadPayloads<TSpecBuilders>>>;
    }

    actions(build: (ctx: SpecBuilderActionsContext<TContext>) => SpecBuilder_EntityAction<TContext>[]) {
        const ctx = createSpecBuilderActionsContext<TContext>();
        const actions = build(ctx);
        for (const action of actions) {
            // TODO
        }
        return this;
    }
}