import { Spec_Entity } from "../../../specs";
import { EntityAction } from "./entity-actions/entity-action";
import { EntitySectionBuilder } from "./entity-section";
import { ReadPayloadBuilder } from "./read-payload";


export type EntityRequestContext<T extends EntityBuilder<unknown, unknown, unknown>> = T extends EntityBuilder<infer U, unknown, unknown> ? U: never;

export type Entity<T extends EntityBuilder<unknown, unknown, unknown>> = T extends EntityBuilder<unknown, infer U, unknown> ? U: never;

export type ReadEntity<T extends EntityBuilder<unknown, unknown, unknown>> = T extends EntityBuilder<unknown, unknown, infer U> ? U: never;

type EntitySectionBuilders = { [section: string]: EntitySectionBuilder<unknown, never> };

export type EntitySections<T extends EntitySectionBuilders> = {
    [I in keyof T]: T[I]
};

export type ReadEntityBuilder = { [section: string]: ReadPayloadBuilder<never> };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EntityBuilder<_TReqCtx, _TEntity, _TReadEntity> {

    _spec: Partial<Spec_Entity>;
    _entity: EntitySectionBuilders;
    _readEntity: ReadEntityBuilder;
    _commands: { [id: string]: EntityAction<_TReqCtx> };
    _globalCommands: { [id: string]: EntityAction<_TReqCtx> };
    _queries: { [id: string]: EntityAction<_TReqCtx> };

    static create<TReqCtx>(): EntityBuilder<TReqCtx, unknown, unknown> {
        return new EntityBuilder<TReqCtx, unknown, unknown>();
    }

    private constructor() {
        this._spec = {};
        this._entity = {};
        this._readEntity = {};
        this._commands = {};
        this._globalCommands = {};
        this._queries = {};
    }

    name(val: string): this {
        this._spec.name = val;
        return this;
    }
    
    singleton(): this {
        this._spec.singleton = true;
        return this;
    }

    entity<TEntitySections extends EntitySectionBuilders>(sections: TEntitySections): EntityBuilder<_TReqCtx, EntitySections<TEntitySections>, _TReadEntity> {
        this._entity = sections;
        return this as EntityBuilder<_TReqCtx, EntitySections<TEntitySections>, _TReadEntity>;
    }

    readEntity<TReadPayloads extends { [section: string]: ReadPayloadBuilder<never> }>(payloads: TReadPayloads) {
        this._readEntity = payloads;
        return this as EntityBuilder<_TReqCtx, _TEntity, _TReadEntity>;
    }

    actions(...actions: EntityAction<_TReqCtx>[]): this {
        for (const action of actions) {
            // 
        }
        return this;
    }

}