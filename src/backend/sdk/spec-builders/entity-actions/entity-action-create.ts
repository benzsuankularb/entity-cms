import { Spec_GlobalCommand_Create } from "../../../../specs";
import { MaybePromise, ReplaceField, SpecBuilderContextTypes } from "../context";
import { SpecBuilder_WritePayloads, WritePayloads } from "../write-payload";
import { SpecBuilder_EntityAction } from "./entity-action";

type SpecBuilder_EntityAction_Create_HandleFunc<TContext extends SpecBuilderContextTypes> =
    (options: {
        context: TContext['_request_context'],
        endpoint?: TContext['_endpoint'],
        payloads: TContext['_payloads']
    }) => MaybePromise<[entityId: string]>

type SpecBuilder_EntityAction_Create_AuthFunc<TContext extends SpecBuilderContextTypes> =
    (options: {
        context: TContext['_request_context'],
        endpoint?: TContext['_endpoint']
    }) => MaybePromise<boolean>

export class SpecBuilder_EntityAction_Create<TContext extends SpecBuilderContextTypes> extends SpecBuilder_EntityAction<TContext> {

    _type = 'entity-action-create';
    _spec: Partial<Spec_GlobalCommand_Create>;
    _payloads: SpecBuilder_WritePayloads;
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: SpecBuilder_EntityAction_Create_AuthFunc<TContext>
    _handle?: SpecBuilder_EntityAction_Create_HandleFunc<TContext>;

    constructor() {
        super();
        this._spec = {
            command: 'create',
        };
        this._payloads = {};
    }
    
    // endpoints<T extends _TEndPoint>(val: SpecBuilder_EndPoints<_TEndPoint, T>): SpecBuilder_EntityAction_Create<_TReqCtx, _TPayloads, EndPoint<typeof val>> {
    //     return this as unknown as SpecBuilder_EntityAction_Create<_TReqCtx, _TPayloads, EndPoint<typeof val>>;
    // }

    payloads<T extends SpecBuilder_WritePayloads>(val: T): SpecBuilder_EntityAction_Create<ReplaceField<TContext, '_payloads', WritePayloads<T>>> {
        this._payloads = val;
        return this as SpecBuilder_EntityAction_Create<ReplaceField<TContext, '_payloads', WritePayloads<T>>>;
    }

    auth(handler: SpecBuilder_EntityAction_Create_AuthFunc<TContext>) {
        this._auth = handler;
        return this;
    }

    handle(handler: SpecBuilder_EntityAction_Create_HandleFunc<TContext>) {
        this._handle = handler;
        return this;
    }
    
}