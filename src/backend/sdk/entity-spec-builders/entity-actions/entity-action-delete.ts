import { Spec_EntityCommand_Delete } from "../../../../specs";
import { EndPoint, EndPoints } from "../endpoints";
import { EntityAction } from "./entity-action";

type EntityAction_Delete_HandleFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string }) => void | Promise<void>

type EntityAction_Delete_AuthFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string }) => boolean | Promise<boolean>

export class EntityAction_Delete<
    _TReqCtx,
    _TEndPoint extends string | never,
    _TOmit extends string
> extends EntityAction<_TReqCtx> {

    _spec: Partial<Spec_EntityCommand_Delete>;
    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Delete_AuthFunc<_TReqCtx, _TEndPoint>
    _handle?: EntityAction_Delete_HandleFunc<_TReqCtx, _TEndPoint>;

    static create<TReqCtx, TEndPoint extends string | never>() {
        return new EntityAction_Delete<TReqCtx, TEndPoint, never>();
    }

    private constructor() {
        super();
        this._spec = {
            command: 'delete'
        };
    }
    
    endpoints<T extends _TEndPoint>(val: EndPoints<_TEndPoint, T>):
        Omit<
            EntityAction_Delete<_TReqCtx, EndPoint<typeof val>, _TOmit | 'endpoints'>,
            _TOmit | 'endpoints'
        >
    {
        return this as unknown as EntityAction_Delete<_TReqCtx, EndPoint<typeof val>, _TOmit | 'endpoints'>;
    }

    auth(handler: EntityAction_Delete_AuthFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_Delete<_TReqCtx, _TEndPoint, _TOmit | 'auth'>,
            _TOmit | 'auth'
        >
    {
        this._auth = handler;
        return this as EntityAction_Delete<_TReqCtx, _TEndPoint, _TOmit | 'auth'>;
    }

    handle(handler: EntityAction_Delete_HandleFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_Delete<_TReqCtx, _TEndPoint, _TOmit | 'handle'>,
            _TOmit | 'handle'
        >
    {
        this._handle = handler;
        return this as EntityAction_Delete<_TReqCtx, _TEndPoint, _TOmit | 'handle'>;
    }
    
}