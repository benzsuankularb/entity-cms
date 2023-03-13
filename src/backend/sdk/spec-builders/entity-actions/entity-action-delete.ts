import { MaybePromise } from "@trpc/server";
import { Spec_EntityCommand_Delete } from "../../../../specs";
import { EndPoint, RequestContext, SpecBuilderContextTypes } from "../context";
import { SpecBuilder_EntityAction } from "./entity-action";

type SpecBuilder_EntityAction_Delete_HandleFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: RequestContext<T>,
        endpoint?: EndPoint<T>,
        entityId: string
    }) => MaybePromise<void>

type SpecBuilder_EntityAction_Delete_AuthFunc<T extends SpecBuilderContextTypes> =
    (options: {
        context: RequestContext<T>,
        endpoint?: EndPoint<T>,
        entityId: string
    }) => MaybePromise<boolean>

export class SpecBuilder_EntityAction_Delete<TContext extends SpecBuilderContextTypes> extends SpecBuilder_EntityAction<TContext> {

    _type = 'entity-action-delete';
    _spec: Partial<Spec_EntityCommand_Delete>;
    // _endpoints?: SpecBuilder_EndPoints<unknown, _TEndPoint>;
    _auth?: SpecBuilder_EntityAction_Delete_AuthFunc<TContext>
    _handle?: SpecBuilder_EntityAction_Delete_HandleFunc<TContext>;

    constructor() {
        super();
        this._spec = {
            command: 'delete'
        };
    }
    
    // endpoints<T extends _TEndPoint>(val: SpecBuilder_EndPoints<_TEndPoint, T>): SpecBuilder_EntityAction_Delete<TContext, EndPoint<typeof val>>
    // {
    //     return this as unknown as SpecBuilder_EntityAction_Delete<TContext, EndPoint<typeof val>>;
    // }

    auth(handler: SpecBuilder_EntityAction_Delete_AuthFunc<TContext>) {
        this._auth = handler;
        return this;
    }

    handle(handler: SpecBuilder_EntityAction_Delete_HandleFunc<TContext>) {
        this._handle = handler;
        return this;
    }
    
}