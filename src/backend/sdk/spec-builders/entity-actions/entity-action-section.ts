import { Spec_EntityCommand_Update } from "../../../../common/specs";
import { MaybePromise } from "../../../../utils/types";
import { EndPoint, EntitySection, EntitySections, RequestContext, SpecBuilderContextTypes } from "../context";
import { SpecBuilder_EntityAction } from "./entity-action";

type EntityAction_Section_QueryFunc<T extends SpecBuilderContextTypes, TSection extends keyof EntitySections<T>> =
    (options: {
        context: RequestContext<T>,
        endpoint?: EndPoint<T>,
        entityId: string 
    }) => MaybePromise<EntitySection<T, TSection>>

type EntityAction_Section_MutateFunc<T extends SpecBuilderContextTypes, TSection extends keyof EntitySections<T>> =
    (options: {
        context: RequestContext<T>,
        endpoint?: EndPoint<T>,
        payloads: EntitySection<T, TSection>,
        entityId: string,
    }) => MaybePromise<EntitySection<T, TSection>>

type EntityAction_Section_AuthFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: RequestContext<T>,
        endpoint?: EndPoint<T>,
        entityId: string
    }) => MaybePromise<[query: boolean, mutate: boolean]>

export class SpecBuilder_EntityAction_Section<TContext extends SpecBuilderContextTypes, TSection extends keyof EntitySections<TContext>> extends SpecBuilder_EntityAction<TContext> {

    _type = 'entity-action-section';
    _spec: Partial<Spec_EntityCommand_Update>;
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Section_AuthFunc<TContext>
    _query?: EntityAction_Section_QueryFunc<TContext, TSection>;
    _mutate?: EntityAction_Section_MutateFunc<TContext, TSection>;

    constructor(section: keyof EntitySections<TContext>) {
        super();
        this._spec = {
            command: 'update',
            section: section as string,
        };
    }
    
    // endpoints<T extends _TEndPoint>(val: SpecBuilder_EndPoints<_TEndPoint, T>): SpecBuilder_EntityAction_Section<TContext, _TPayloads, EndPoint<typeof val>>
    // {
    //     this._endpoints = val;
    //     return this as unknown as SpecBuilder_EntityAction_Section<TContext, _TPayloads, EndPoint<typeof val>>;
    // }

    auth(handler: EntityAction_Section_AuthFunc<TContext>) {
        this._auth = handler;
        return this;
    }

    query(handler: EntityAction_Section_QueryFunc<TContext, TSection>) {
        this._query = handler;
        return this;
    }

    mutate(handler: EntityAction_Section_MutateFunc<TContext, TSection>) {
        this._mutate = handler;
        return this;
    }
    
}