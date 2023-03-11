import { Spec_EntityCommand_Execute } from "../../../../specs";
import { EndPoint, EndPoints } from "../endpoints";
import { WritePayloadBuilders, WritePayloads } from "../write-payload";
import { EntityAction } from "./entity-action";

type EntityAction_Command_HandleFunc<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string, payloads: _TPayloads }) => void | Promise<void>

type EntityAction_Command_AuthFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string }) => boolean | Promise<boolean>

export class EntityAction_Command<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never,
    _TOmit extends string
> extends EntityAction<_TReqCtx> {

    _spec: Partial<Spec_EntityCommand_Execute>;
    _payloads: WritePayloadBuilders;
    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Command_AuthFunc<_TReqCtx, _TEndPoint>
    _handle?: EntityAction_Command_HandleFunc<_TReqCtx, _TPayloads, _TEndPoint>;

    static create<TReqCtx, TEndPoint extends string | never>(action: string) {
        return new EntityAction_Command<TReqCtx, unknown, TEndPoint, never>(action);
    }

    private constructor(action: string) {
        super();
        this._spec = {
            command: 'execute',
            action: action,
        };
        this._payloads = {};
    }
    
    name(val: string): 
        Omit<
            EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'name'>,
            _TOmit | 'name'
        >
    {
        this._spec.name = val;
        return this as EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'name'>;
    }
    
    endpoints<T extends _TEndPoint>(val: EndPoints<_TEndPoint, T>):
        Omit<
            EntityAction_Command<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>,
            _TOmit | 'endpoints'
        >
    {
        return this as unknown as EntityAction_Command<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>;
    }

    function(val: string):
       Omit<
            EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'function'>,
            _TOmit | 'function'
        >
    {
        this._spec.function = val;
        return this as EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'function'>;
    }

    payloads<T extends WritePayloadBuilders>(val: T): 
        Omit<
            EntityAction_Command<_TReqCtx, WritePayloads<T>, _TEndPoint, _TOmit | 'payloads'>,
            _TOmit | 'payloads'
        >
    {
        this._payloads = val;
        return this as EntityAction_Command<_TReqCtx, WritePayloads<T>, _TEndPoint, _TOmit | 'payloads'>;
    }

    auth(handler: EntityAction_Command_AuthFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>,
            _TOmit | 'auth'
        >
    {
        this._auth = handler;
        return this as EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>;
    }

    handle(handler: EntityAction_Command_HandleFunc<_TReqCtx, _TPayloads, _TEndPoint>):
        Omit<
            EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'handle'>,
            _TOmit | 'handle'
        >
    {
        this._handle = handler;
        return this as EntityAction_Command<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'handle'>;
    }
    
}