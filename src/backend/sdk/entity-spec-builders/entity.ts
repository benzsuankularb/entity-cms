import { EntitySectionBuilder } from "./entity-section";


export type EntityRequestContext<T extends EntityBuilder<unknown, unknown>> = T extends EntityBuilder<infer U, unknown> ? U: never;

export type Entity<T extends EntityBuilder<unknown, unknown>> = T extends EntityBuilder<unknown, infer U> ? U: never;

type EntitySectionBuilders = { [section: string]: EntitySectionBuilder<unknown> };

export function entity<TEntitySections extends EntitySectionBuilders>(options: EntityBuilderOptions<TEntitySections>) {
    return EntityBuilder.create(options);
}

export interface EntityBuilderOptions<
    TEntitySections extends EntitySectionBuilders
> {
    name: string
    singleton?: boolean;
    entity: TEntitySections;
}

export type EntitySections<T extends EntitySectionBuilders> = {
    [I in keyof T]: T[I]
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class EntityBuilder<_TReqCtx, __TEntitySections> {

    _sections: EntitySectionBuilders;

    static create<TReqCtx, TTEntitySections extends EntitySectionBuilders>(options: EntityBuilderOptions<TTEntitySections>): EntityBuilder<TReqCtx, EntitySections<TTEntitySections>> {
        return new EntityBuilder<TReqCtx, EntitySections<TTEntitySections>>({ sections: options.entity });
    }

    private constructor(options: { sections: EntitySectionBuilders }) {
        this._sections = { ...options.sections };
    }

}