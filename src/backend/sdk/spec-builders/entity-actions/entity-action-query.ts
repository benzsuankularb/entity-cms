import { Spec_ReadEntityQuery } from "../../../../common/specs";
import { MaybePromise } from "../../../../utils/types";
import { EndPoint, ReadEntity, RequestContext, SpecBuilderContextTypes } from "../context";
import { SpecBuilder_EntityAction } from "./entity-action";

type EntityQuery_List_HandleFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: RequestContext<T>,
        endpoint?: EndPoint<T>,
        /* filters, sort */
    }) => MaybePromise<ReadEntity<T>[]>

type EntityQuery_List_AuthFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: RequestContext<T>,
        endpoint?: EndPoint<T>,
    }) => MaybePromise<boolean>

export class SpecBuilder_EntityAction_List<TContext extends SpecBuilderContextTypes> extends SpecBuilder_EntityAction<TContext> {

    _type = 'entity-action-query';
    _spec: Partial<Spec_ReadEntityQuery>;
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: EntityQuery_List_AuthFunc<TContext>
    _handle?: EntityQuery_List_HandleFunc<TContext>;

    constructor() {
        super();
        this._spec = { };
        //TODO filter
    }
    
    name(val: string) {
        this._spec.name = val;
        return this;
    }
    
    // endpoints<T extends _TEndPoint>(val: SpecBuilder_EndPoints<_TEndPoint, T>): SpecBuilder_EntityAction_List<TContext, _TReadEntity, EndPoint<typeof val>>
    // {
    //     return this as unknown as SpecBuilder_EntityAction_List<TContext, _TReadEntity, EndPoint<typeof val>>;
    // }

    auth(handler: EntityQuery_List_AuthFunc<TContext>) {
        this._auth = handler;
        return this;
    }

    handle(handler: EntityQuery_List_HandleFunc<TContext>): SpecBuilder_EntityAction_List<TContext> {
        this._handle = handler;
        return this;
    }
    
}