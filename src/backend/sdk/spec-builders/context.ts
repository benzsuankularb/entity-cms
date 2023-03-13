/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prettify, ReplaceField } from "../../../utils/types";
import { SpecBuilder_Entity } from "./entity";
import { SpecBuilder_EntityAction_Command, SpecBuilder_EntityAction_Create, SpecBuilder_EntityAction_Delete, SpecBuilder_EntityAction_GlobalCommand, SpecBuilder_EntityAction_QueryByIds, SpecBuilder_EntityAction_Section } from "./entity-actions";
import { SpecBuilder_EntitySection } from "./entity-section";
import { SpecBuilder_MenuItem } from "./menu-item";
import { SpecBuilder_ReadPayload } from "./read-payload";
import { SpecBuilder_Spec } from "./spec";
import { SpecBuilder_WritePayload } from "./write-payload";

export type SetEntitySections<T extends SpecBuilderContextTypes, TEntity extends object> = Prettify<ReplaceField<T, '_entity_sections', TEntity>>;
export type SetReadEntity<T extends SpecBuilderContextTypes, TReadEntity extends object> = Prettify<ReplaceField<T, '_read_entity', TReadEntity>>;
export type SetPayloads<T extends SpecBuilderContextTypes, TPayloads extends object> = Prettify<ReplaceField<T, '_payloads', TPayloads>>;

export type RequestContext<T extends SpecBuilderContextTypes> = T['_request_context'];
export type EndPoint<T extends SpecBuilderContextTypes> = T['_endpoint'];
export type EntitySections<T extends SpecBuilderContextTypes> = T['_entity_sections'];
export type EntitySection<T extends SpecBuilderContextTypes, TSection extends keyof T['_entity_sections']> = T['_entity_sections'][TSection];
export type ReadEntity<T extends SpecBuilderContextTypes> = T['_read_entity'];
export type Payloads<T extends SpecBuilderContextTypes> = T['_payloads'];

export interface SpecBuilderContextTypes<
    TRequestContext = unknown,
    TEntitySections = unknown,
    TReadEntity = unknown,
    TPayloads = unknown,
    TEndpoint = unknown
> {
    /**
     * @internal
     */
    _request_context: TRequestContext;
    /**
     * @internal
     */
    _entity_sections: TEntitySections;
    /**
     * @internal
     */
    _read_entity: TReadEntity;
    /**
     * @internal
     */
    _payloads: TPayloads;
    /**
     * @internal
     */
    _endpoint: TEndpoint;
}

export type SpecBuilderActionsContext<T extends SpecBuilderContextTypes> = ReturnType<typeof createSpecBuilderActionsContext<T>>;

export function createSpecBuilderActionsContext<T extends SpecBuilderContextTypes>() {
    return{
        create: () => new SpecBuilder_EntityAction_Create<T>(),
        delete: () => new SpecBuilder_EntityAction_Delete<T>(),
        section: <TSection extends keyof EntitySections<T>>(section: TSection) => new SpecBuilder_EntityAction_Section<T, TSection>(section),
        command: (action: string) => new SpecBuilder_EntityAction_Command<T>(action),
        globalCommand: (action: string) => new SpecBuilder_EntityAction_GlobalCommand<T>(action),
        queryByIds: () => new SpecBuilder_EntityAction_QueryByIds<T>(),
        writePayload: () => new SpecBuilder_WritePayload(),
    };
}

export function createSpecBuilderContext<TReqContext>() {
    type TContext = SpecBuilderContextTypes<TReqContext>;
    return {
        spec: () => new SpecBuilder_Spec<TContext>(),
        entity: (id: string) => new SpecBuilder_Entity<TContext>(id),
        writePayload: () => new SpecBuilder_WritePayload(),
        readPayload: () => new SpecBuilder_ReadPayload(),
        section: () => new SpecBuilder_EntitySection(),
        menuItem: () => new SpecBuilder_MenuItem<TContext>(),
    }
}