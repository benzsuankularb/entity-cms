import { SpecBuilder_Entity } from "./entity";
import { SpecBuilder_EntityAction_Command, SpecBuilder_EntityAction_Create, SpecBuilder_EntityAction_Delete, SpecBuilder_EntityAction_GlobalCommand, SpecBuilder_EntityAction_QueryByIds, SpecBuilder_EntityAction_Section } from "./entity-actions";
import { SpecBuilder_EntitySection } from "./entity-section";
import { SpecBuilder_MenuItem } from "./menu-item";
import { SpecBuilder_ReadPayload } from "./read-payload";
import { SpecBuilder_Spec } from "./spec";
import { SpecBuilder_WritePayload } from "./write-payload";

export type MaybePromise<T> = T | Promise<T>;

export type ReplaceField<T, TKey extends keyof T, TNew> = Omit<T, TKey> & Record<TKey, TNew>;

export interface SpecBuilderContextTypes<
    TRequestContext = unknown,
    TEntity = unknown,
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
    _entity: TEntity;
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
        section: (section: string) => new SpecBuilder_EntityAction_Section<T>(section),
        command: (action: string) => new SpecBuilder_EntityAction_Command<T>(action),
        globalCommand: (action: string) => new SpecBuilder_EntityAction_GlobalCommand<T>(action),
        queryByIds: () => new SpecBuilder_EntityAction_QueryByIds<T>()
    };
}

export function createSpecBuilderContext<T extends SpecBuilderContextTypes>() {
    return {
        spec: () => new SpecBuilder_Spec<T>(),
        entity: (id: string) => new SpecBuilder_Entity<T>(id),
        section: () => new SpecBuilder_EntitySection<T>(),
        writePayload: () => new SpecBuilder_WritePayload(),
        readPayload: () => new SpecBuilder_ReadPayload(),
        menuItem: () => new SpecBuilder_MenuItem<T>(),
    }
}

const ctx = createSpecBuilderContext();
const e =ctx
    .entity('e1')
    .singleton()
    .sections({
        sec1: ctx.section()
            .name('')
            .payloads({
                pay1: ctx
                    .writePayload()
                    .name('Pay1')
                    .typeScheme({ type: 'string' })
            })
    })
    .readEntity({
        pay1: ctx
            .readPayload()
            .typeScheme({ type: 'number' })
    });

// type E = typeof e['_read_entity'];