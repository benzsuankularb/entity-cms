import { MaybePromise, SpecBuilderContextTypes } from "../context";
import { SpecBuilder_EntityAction } from "./entity-action";

type SpecBuilder_EntityAction_QueryByIds_HandleFunc<T extends SpecBuilderContextTypes> = (
    options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
        ids: string[]
    }) => MaybePromise<{ [id: string ]: T['_read_entity'] }>

type SpecBuilder_EntityAction_QueryByIds_AuthFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
    }) => MaybePromise<boolean>

export class SpecBuilder_EntityAction_QueryByIds<TContext extends SpecBuilderContextTypes> extends SpecBuilder_EntityAction<TContext> {

    _type = 'entity-action-query-by-ids';
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: SpecBuilder_EntityAction_QueryByIds_AuthFunc<TContext>
    _handle?: SpecBuilder_EntityAction_QueryByIds_HandleFunc<TContext>;

    constructor() {
        super();
    }
    
    // endpoints<T extends _TEndPoint>(val: SpecBuilder_EndPoints<_TEndPoint, T>): SpecBuilder_EntityAction_QueryByIds<TContext, _TReadEntity, EndPoint<typeof val>>
    // {
    //     return this as unknown as SpecBuilder_EntityAction_QueryByIds<TContext, _TReadEntity, EndPoint<typeof val>>;
    // }

    auth(handler: SpecBuilder_EntityAction_QueryByIds_AuthFunc<TContext>) {
        this._auth = handler;
        return this;
    }

    handle(handler: SpecBuilder_EntityAction_QueryByIds_HandleFunc<TContext>) {
        this._handle = handler;
        return this;
    }
    
}