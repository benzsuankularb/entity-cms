import { Spec_GlobalCommand_Execute } from "../../../../specs";
import { MaybePromise, ReplaceField, SpecBuilderContextTypes } from "../context";
import { SpecBuilder_WritePayloads, WritePayloads } from "../write-payload";
import { SpecBuilder_EntityAction } from "./entity-action";

type SpecBuilder_EntityAction_GlobalCommand_HandleFunc<T extends SpecBuilderContextTypes> = 
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
        payloads: T['_payloads']
    }) => MaybePromise<void>

type SpecBuilder_EntityAction_GlobalCommand_AuthFunc<T extends SpecBuilderContextTypes> = 
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint']
    }) => MaybePromise<boolean>

export class SpecBuilder_EntityAction_GlobalCommand<TContext extends SpecBuilderContextTypes> extends SpecBuilder_EntityAction<TContext> {

    _type = 'entity-action-global-command';
    _spec: Partial<Spec_GlobalCommand_Execute>;
    _payloads: SpecBuilder_WritePayloads;
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: SpecBuilder_EntityAction_GlobalCommand_AuthFunc<TContext>
    _handle?: SpecBuilder_EntityAction_GlobalCommand_HandleFunc<TContext>;

    constructor(action: string) {
        super();
        this._spec = {
            command: 'execute',
            action: action,
        };
        this._payloads = {};
    }
    
    name(val: string) {
        this._spec.name = val;
        return this;
    }
    
    // endpoints<T extends _TEndPoint>(val: SpecBuilder_EndPoints<_TEndPoint, T>): SpecBuilder_EntityAction_GlobalCommand<TContext, _TPayloads, EndPoint<typeof val>> {
    //     return this as unknown as SpecBuilder_EntityAction_GlobalCommand<TContext, _TPayloads, EndPoint<typeof val>>;
    // }

    function(val: string) {
        this._spec.function = val;
        return this;
    }

    payloads<T extends SpecBuilder_WritePayloads>(val: T): SpecBuilder_EntityAction_GlobalCommand<ReplaceField<TContext, '_payloads', WritePayloads<T>>> {
        this._payloads = val;
        return this as SpecBuilder_EntityAction_GlobalCommand<ReplaceField<TContext, '_payloads', WritePayloads<T>>>;
    }

    auth(handler: SpecBuilder_EntityAction_GlobalCommand_AuthFunc<TContext>) {
        this._auth = handler;
        return this;
    }

    handle(handler: SpecBuilder_EntityAction_GlobalCommand_HandleFunc<TContext>) {
        this._handle = handler;
        return this;
    }
    
}