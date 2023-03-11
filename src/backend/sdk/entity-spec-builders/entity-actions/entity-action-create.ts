import { Spec_GlobalCommand_Create } from "../../../../specs";
import { EndPoint, EndPoints } from "../endpoints";
import { WritePayloadBuilders, WritePayloads } from "../write-payload";
import { EntityAction } from "./entity-action";

type EntityAction_Create_HandleFunc<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, payloads: _TPayloads }) => [entityId: string] | Promise<[entityId: string]>

type EntityAction_Create_AuthFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint }) => boolean | Promise<boolean>

export class EntityAction_Create<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never,
    _TOmit extends string
> extends EntityAction<_TReqCtx> {

    _spec: Partial<Spec_GlobalCommand_Create>;
    _payloads: WritePayloadBuilders;
    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Create_AuthFunc<_TReqCtx, _TEndPoint>
    _handle?: EntityAction_Create_HandleFunc<_TReqCtx, _TPayloads, _TEndPoint>;

    static create<TReqCtx, TEndPoint extends string | never>() {
        return new EntityAction_Create<TReqCtx, unknown, TEndPoint, never>();
    }

    private constructor() {
        super();
        this._spec = {
            command: 'create',
        };
        this._payloads = {};
    }
    
    endpoints<T extends _TEndPoint>(val: EndPoints<_TEndPoint, T>):
        Omit<
            EntityAction_Create<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>,
            _TOmit | 'endpoints'
        >
    {
        return this as unknown as EntityAction_Create<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>;
    }

    payloads<T extends WritePayloadBuilders>(val: T): 
        Omit<
            EntityAction_Create<_TReqCtx, WritePayloads<T>, _TEndPoint, _TOmit | 'payloads'>,
            _TOmit | 'payloads'
        >
    {
        this._payloads = val;
        return this as EntityAction_Create<_TReqCtx, WritePayloads<T>, _TEndPoint, _TOmit | 'payloads'>;
    }

    auth(handler: EntityAction_Create_AuthFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_Create<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>,
            _TOmit | 'auth'
        >
    {
        this._auth = handler;
        return this as EntityAction_Create<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>;
    }

    handle(handler: EntityAction_Create_HandleFunc<_TReqCtx, _TPayloads, _TEndPoint>):
        Omit<
            EntityAction_Create<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'handle'>,
            _TOmit | 'handle'
        >
    {
        this._handle = handler;
        return this as EntityAction_Create<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'handle'>;
    }
    
}