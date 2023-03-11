import { Spec_EntityCommand_Update } from "../../../../specs";
import { EndPoint, EndPoints } from "../endpoints";
import { EntityAction } from "./entity-action";

type EntityAction_Update_HandleFunc<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string, payloads: _TPayloads }) => _TPayloads | Promise<_TPayloads>

type EntityAction_Update_AuthFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string }) => boolean | Promise<boolean>

export class EntityAction_Update<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never,
    _TOmit extends string
> extends EntityAction<_TReqCtx> {

    _spec: Partial<Spec_EntityCommand_Update>;
    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Update_AuthFunc<_TReqCtx, _TEndPoint>
    _handle?: EntityAction_Update_HandleFunc<_TReqCtx, _TPayloads, _TEndPoint>;

    static create<TReqCtx, TEntitySections extends { [section: string]: unknown }, TEndPoint extends string | never, TSection extends string>(section: TSection) {
        return new EntityAction_Update<TReqCtx, TEntitySections[TSection], TEndPoint, never>(section);
    }

    private constructor(section: string) {
        super();
        this._spec = {
            command: 'update',
            section,
        };
    }
    
    endpoints<T extends _TEndPoint>(val: EndPoints<_TEndPoint, T>):
        Omit<
            EntityAction_Update<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>,
            _TOmit | 'endpoints'
        >
    {
        return this as unknown as EntityAction_Update<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>;
    }

    auth(handler: EntityAction_Update_AuthFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_Update<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>,
            _TOmit | 'auth'
        >
    {
        this._auth = handler;
        return this as EntityAction_Update<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>;
    }

    handle(handler: EntityAction_Update_HandleFunc<_TReqCtx, _TPayloads, _TEndPoint>):
        Omit<
            EntityAction_Update<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'handle'>,
            _TOmit | 'handle'
        >
    {
        this._handle = handler;
        return this as EntityAction_Update<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'handle'>;
    }
    
}