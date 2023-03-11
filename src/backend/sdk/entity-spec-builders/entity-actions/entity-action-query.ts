import { Spec_ReadEntityQuery } from "../../../../specs";
import { EndPoint, EndPoints } from "../endpoints";
import { EntityAction } from "./entity-action";

type EntityAction_Query_HandleFunc<
    _TReqCtx,
    _TReadEntity,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, /* filters, sort */ }) => _TReadEntity[] | Promise<_TReadEntity[]>

type EntityAction_Query_AuthFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint }) => boolean | Promise<boolean>

export class EntityAction_Query<
    _TReqCtx,
    _TReadEntity,
    _TEndPoint extends string | never,
    _TOmit extends string
> extends EntityAction<_TReqCtx> {

    _spec: Partial<Spec_ReadEntityQuery>;
    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Query_AuthFunc<_TReqCtx, _TEndPoint>
    _handle?: EntityAction_Query_HandleFunc<_TReqCtx, _TReadEntity, _TEndPoint>;

    static create<TReqCtx, TEndPoint extends string | never>() {
        return new EntityAction_Query<TReqCtx, unknown, TEndPoint, never>();
    }

    private constructor() {
        super();
        this._spec = { };
        //TODO filter
    }
    
    name(val: string): 
        Omit<
            EntityAction_Query<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'name'>,
            _TOmit | 'name'
        >
    {
        this._spec.name = val;
        return this as EntityAction_Query<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'name'>;
    }
    
    endpoints<T extends _TEndPoint>(val: EndPoints<_TEndPoint, T>):
        Omit<
            EntityAction_Query<_TReqCtx, _TReadEntity, EndPoint<typeof val>, _TOmit | 'endpoints'>,
            _TOmit | 'endpoints'
        >
    {
        return this as unknown as EntityAction_Query<_TReqCtx, _TReadEntity, EndPoint<typeof val>, _TOmit | 'endpoints'>;
    }

    auth(handler: EntityAction_Query_AuthFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_Query<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'auth'>,
            _TOmit | 'auth'
        >
    {
        this._auth = handler;
        return this as EntityAction_Query<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'auth'>;
    }

    handle(handler: EntityAction_Query_HandleFunc<_TReqCtx, _TReadEntity, _TEndPoint>):
        Omit<
            EntityAction_Query<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'handle'>,
            _TOmit | 'handle'
        >
    {
        this._handle = handler;
        return this as EntityAction_Query<_TReqCtx, _TReadEntity, _TEndPoint, _TOmit | 'handle'>;
    }
    
}