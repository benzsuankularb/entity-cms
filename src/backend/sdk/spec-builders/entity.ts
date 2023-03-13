import { Spec_Entity } from "../../../common/specs";
import { createSpecBuilderActionsContext, SetEntitySections, SetReadEntity, SpecBuilderActionsContext, SpecBuilderContextTypes } from "./context";
import { SpecBuilder_EntityAction } from "./entity-actions/entity-action";
import { InferSpecBuilder_EntitySection, SpecBuilder_EntitySection } from "./entity-section";
import { ReadPayloads, SpecBuilder_ReadPayloads } from "./read-payload";

export type InferSpecBuilder_Entity<T> = T extends SpecBuilder_Entity<infer U> ? U : never;

type SpecBuilder_Entity_Sections = { [section: string]: SpecBuilder_EntitySection<unknown> };

export type InferSpecBuilder_Entity_Sections<T extends SpecBuilder_Entity_Sections> = {
    [I in keyof T]: InferSpecBuilder_EntitySection<T[I]>
}

export class SpecBuilder_Entity<TContext extends SpecBuilderContextTypes>{

    _type = 'entity';
    _id: string;
    _spec: Partial<Spec_Entity>;
    _sections: SpecBuilder_Entity_Sections;
    _readEntity: SpecBuilder_ReadPayloads;
    _commands: { [id: string]: SpecBuilder_EntityAction<TContext> };
    _globalCommands: { [id: string]: SpecBuilder_EntityAction<TContext> };
    _queries: { [id: string]: SpecBuilder_EntityAction<TContext> };

    constructor(id: string) {
        this._id = id;
        this._spec = { };
        this._sections = {};
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

    // sections<TSpecBuilders extends SpecBuilder_Entity_Sections>(sections: TSpecBuilders): SpecBuilder_Entity<Prettify<ReplaceField<TContext, '_entity', InferSpecBuilder_Entity_Sections<TSpecBuilders>>>> {
    //     this._sections = sections;
    //     return this as unknown as SpecBuilder_Entity<Prettify<ReplaceField<TContext, '_entity', InferSpecBuilder_Entity_Sections<TSpecBuilders>>>>;
    // }

    sections<TSpecBuilders extends SpecBuilder_Entity_Sections>(sections: TSpecBuilders): SpecBuilder_Entity<SetEntitySections<TContext, InferSpecBuilder_Entity_Sections<TSpecBuilders>>> {
        this._sections = sections;
        return this as unknown as SpecBuilder_Entity<SetEntitySections<TContext, InferSpecBuilder_Entity_Sections<TSpecBuilders>>>;
    }

    readEntity<TSpecBuilders extends SpecBuilder_ReadPayloads>(payloads: TSpecBuilders): SpecBuilder_Entity<SetReadEntity<TContext, ReadPayloads<TSpecBuilders>>> {
        this._readEntity = payloads;
        return this as unknown as SpecBuilder_Entity<SetReadEntity<TContext, ReadPayloads<TSpecBuilders>>>;
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