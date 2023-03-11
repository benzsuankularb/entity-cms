import { Spec_EntityCommand_Update } from "../../../../specs";
import { EndPoint, EndPoints } from "../endpoints";
import { EntityAction } from "./entity-action";

type EntityAction_Section_QueryFunc<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string }) => _TPayloads | Promise<_TPayloads>

type EntityAction_Section_MutateFunc<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string, payloads: _TPayloads }) => _TPayloads | Promise<_TPayloads>

type EntityAction_Section_AuthFunc<
    _TReqCtx,
    _TEndPoint extends string | never
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string }) => [query: boolean, mutate: boolean] | Promise<[query: boolean, mutate: boolean]>

export class EntityAction_Section<
    _TReqCtx,
    _TPayloads,
    _TEndPoint extends string | never,
    _TOmit extends string
> extends EntityAction<_TReqCtx> {

    _spec: Partial<Spec_EntityCommand_Update>;
    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Section_AuthFunc<_TReqCtx, _TEndPoint>
    _query?: EntityAction_Section_QueryFunc<_TReqCtx, _TPayloads, _TEndPoint>;
    _mutate?: EntityAction_Section_MutateFunc<_TReqCtx, _TPayloads, _TEndPoint>;

    static create<TReqCtx, TEntitySections extends { [section: string]: unknown }, TEndPoint extends string | never, TSection extends string>(section: TSection) {
        return new EntityAction_Section<TReqCtx, TEntitySections[TSection], TEndPoint, never>(section);
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
            EntityAction_Section<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>,
            _TOmit | 'endpoints'
        >
    {
        return this as unknown as EntityAction_Section<_TReqCtx, _TPayloads, EndPoint<typeof val>, _TOmit | 'endpoints'>;
    }

    auth(handler: EntityAction_Section_AuthFunc<_TReqCtx, _TEndPoint>):
        Omit<
            EntityAction_Section<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>,
            _TOmit | 'auth'
        >
    {
        this._auth = handler;
        return this as EntityAction_Section<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'auth'>;
    }

    query(handler: EntityAction_Section_QueryFunc<_TReqCtx, _TPayloads, _TEndPoint>):
        Omit<
            EntityAction_Section<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'query'>,
            _TOmit | 'query'
        >
    {
        this._query = handler;
        return this as EntityAction_Section<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'query'>;
    }

    mutate(handler: EntityAction_Section_MutateFunc<_TReqCtx, _TPayloads, _TEndPoint>):
        Omit<
            EntityAction_Section<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'mutate'>,
            _TOmit | 'mutate'
        >
    {
        this._mutate = handler;
        return this as EntityAction_Section<_TReqCtx, _TPayloads, _TEndPoint, _TOmit | 'mutate'>;
    }
    
}