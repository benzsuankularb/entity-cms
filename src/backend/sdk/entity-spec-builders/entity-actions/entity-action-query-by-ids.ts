import { EndPoint, EndPoints } from "../endpoints";
import { EntityAction } from "./entity-action";

type EntityAction_QueryByIds_HandleFunc<
    _TReqCtx,
    _TReadEntity,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, ids: string[] }) => { [id: string ]: _TReadEntity } | Promise<{ [id: string ]: _TReadEntity }>

type EntityAction_QueryByIds_AuthFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint }) => boolean | Promise<boolean>

export class EntityAction_QueryByIds<
    _TReqCtx,
    _TReadEntity,
    _TEndPoint extends string | never,
    _TOmit extends string
> extends EntityAction<_TReqCtx> {

    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_QueryByIds_AuthFunc<_TReqCtx, _TEndPoint>
    _handle?: EntityAction_QueryByIds_HandleFunc<_TReqCtx, _TReadEntity, _TEndPoint>;

    static create<TReqCtx, TEndPoint extends string | never>() {
        return new EntityAction_QueryByIds<TReqCtx, unknown, TEndPoint, never>();
    }

    private constructor() {
        super();
    }
    
    endpoints<T extends _TEndPoint>(val: EndPoints<_TEndPoint, T>):
        Omit<
            EntityAction_QueryByIds<_TReqCtx, _TReadEntity, EndPoint<typeof val>, _TOmit | 'endpoints'>,
            _TOmit | 'endpoints'
        >
    {
        return this as unknown as EntityAction_QueryByIds<_TReqCtx, _TReadEntity, EndPoint<typeof val>, _TOmit | 'endpoints'>;
    }

    auth(handler: EntityAction_QueryByIds_AuthFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_QueryByIds<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'auth'>,
            _TOmit | 'auth'
        >
    {
        this._auth = handler;
        return this as EntityAction_QueryByIds<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'auth'>;
    }

    handle(handler: EntityAction_QueryByIds_HandleFunc<_TReqCtx, _TReadEntity, _TEndPoint>):
        Omit<
            EntityAction_QueryByIds<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'handle'>,
            _TOmit | 'handle'
        >
    {
        this._handle = handler;
        return this as EntityAction_QueryByIds<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'handle'>;
    }
    
}