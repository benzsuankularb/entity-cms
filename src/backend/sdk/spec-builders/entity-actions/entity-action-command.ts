import { Maybe } from "@trpc/server";
import { Spec_EntityCommand_Execute } from "../../../../specs";
import { MaybePromise, ReplaceField, SpecBuilderContextTypes } from "../context";
import { SpecBuilder_WritePayloads, WritePayloads } from "../write-payload";
import { SpecBuilder_EntityAction } from "./entity-action";

type SpecBuilder_EntityAction_Command_HandleFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
        payloads: T['_payloads'],
        entityId: string
    }) => MaybePromise<void>

type SpecBuilder_EntityAction_Command_AuthFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: T['_request_context'],
        endpoint?: T['_endpoint'],
        entityId: string
    }) => Maybe<boolean>

export class SpecBuilder_EntityAction_Command<TContext extends SpecBuilderContextTypes> extends SpecBuilder_EntityAction<TContext> {
    _type = 'entity-action-command';
    _spec: Partial<Spec_EntityCommand_Execute>;
    _payloads: SpecBuilder_WritePayloads;
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: SpecBuilder_EntityAction_Command_AuthFunc<TContext>
    _handle?: SpecBuilder_EntityAction_Command_HandleFunc<TContext>;

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
    
    // endpoints<T extends>(val: SpecBuilder_EndPoints<_TEndPoint, T>): SpecBuilder_EntityAction_Command<ReplaceField<TContext, '_endpoint', EndPoint<typeof val>>> {
    //     return this as unknown as SpecBuilder_EntityAction_Command<ReplaceField<TContext, '_endpoint', EndPoint<typeof val>>>;
    // }

    function(val: string) {
        this._spec.function = val;
        return this;
    }

    payloads<T extends SpecBuilder_WritePayloads>(val: T): SpecBuilder_EntityAction_Command<ReplaceField<TContext, '_payloads', WritePayloads<T>>> {
        this._payloads = val;
        return this as SpecBuilder_EntityAction_Command<ReplaceField<TContext, '_payloads', WritePayloads<T>>>;
    }

    auth(handler: SpecBuilder_EntityAction_Command_AuthFunc<TContext>) {
        this._auth = handler;
        return this;
    }

    handle(handler: SpecBuilder_EntityAction_Command_HandleFunc<TContext>) {
        this._handle = handler;
        return this;
    }
    
}