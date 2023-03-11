import { MaybePromise } from "@trpc/server";
import { Spec_EntityCommand_Update } from "../../../../specs";
import { SpecBuilderContextTypes } from "../context";
import { SpecBuilder_EntityAction } from "./entity-action";

type EntityAction_Section_QueryFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
        entityId: string 
    }) => MaybePromise<T['_payloads']>

type EntityAction_Section_MutateFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
        payloads: T['_payloads']
        entityId: string,
    }) => MaybePromise<T['_payloads']>

type EntityAction_Section_AuthFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
        entityId: string
    }) => MaybePromise<[query: boolean, mutate: boolean]>

export class SpecBuilder_EntityAction_Section<TContext extends SpecBuilderContextTypes> extends SpecBuilder_EntityAction<TContext> {

    _type = 'entity-action-section';
    _spec: Partial<Spec_EntityCommand_Update>;
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Section_AuthFunc<TContext>
    _query?: EntityAction_Section_QueryFunc<TContext>;
    _mutate?: EntityAction_Section_MutateFunc<TContext>;

    constructor(section: string) {
        super();
        this._spec = {
            command: 'update',
            section,
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

    query(handler: EntityAction_Section_QueryFunc<TContext>) {
        this._query = handler;
        return this;
    }

    mutate(handler: EntityAction_Section_MutateFunc<TContext>) {
        this._mutate = handler;
        return this;
    }
    
}