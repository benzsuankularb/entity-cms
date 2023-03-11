import { Spec_EntityCommand_Execute } from "../../../specs";
import { EndPoint, EndPoints } from "./endpoints";
import { WritePayloadBuilders, WritePayloads } from "./write-payload";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class EntityAction<_TReqCtx> {}

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export class EntityActionPayload<_TReqCtx, _TPayloads> {

//     _payloads: WritePayloadBuilders;
    
//     static create<TReqCtx>() {
//         return new EntityActionPayload<TReqCtx, unknown>();
//     }

//     private constructor() {
//         this._payloads = {};
//     }

//     payloads<T extends WritePayloadBuilders>(payloadBuilders: T): EntityActionPayload<_TReqCtx, WritePayloads<T>> {
//         this._payloads = { ...payloadBuilders };
//         return this as EntityActionPayload<_TReqCtx, WritePayloads<T>>;
//     }
    
// }

// .actions([
//     ctx.command
//         .update("section1")
//         .endpoints()
//         .auth(() => [true, false])
//         .query()
//         .mutate()
//     ctx.command
//         .entity()
//         .name("Something")
//         .payloads({
//             something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//             something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//         })
//         .suggestion(
//             "number",
//             (payloads, ctx, payloadId) => {}
//         )
//         .suggestion(
//             "number",
//             (payloads, ctx, payloadId) => {}
//         )
//         .suggestion(
//             "number",
//             (payloads, ctx, payloadId) => {}
//         )
//         .auth(
//             (ctx, id) => true
//         )
//         .handle(
//             ({ payloads, ctx }) => {}
//         ),
//     ctx.command
//         .global("something")
//         .name("Something")
//         .payloads({
//             something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//             something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//         })
//         .auth(
//             () => true
//         )
//         .handle(({ payloads, ctx }) => {}),
//     ctx.command
//         .delete()
//         .payloads({
//             something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//             something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//         })
//         .auth(() => true)
//         .handle(({ payloads, ctx }) => {}),
//     ctx.command
//         .create()
//         .payloads({
//             something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//             something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//         })
//         .auth(() => true)
//         .handle(({ payloads, ctx }) => {}),
//     ctx.query()
//         .name("All")
//         .filter(
//             ctx.filter("field1")
//                 .allowRange()
//                 .min()
//                 .max()
//         )
//         .filter(
//             ctx.filter("field1")
//                 .allowRange()
//                 .min()
//                 .max()
//         )
//         .auth(() => true)
//         .query(({ payloads, ctx }) => {}),
// ]);


//         .name("Something")
//         .payloads({
//             something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//             something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//         })
//         .suggestion(
//             "number",
//             (payloads, ctx, payloadId) => {}
//         )
//         .suggestion(
//             "number",
//             (payloads, ctx, payloadId) => {}
//         )
//         .suggestion(
//             "number",
//             (payloads, ctx, payloadId) => {}
//         )
//         .auth(
//             (ctx, id) => true
//         )
//         .handle(
//             ({ payloads, ctx }) => {}
//         ),

type EntityAction_Command_HandleFunc<
    _TReqCtx,
    _TEndPoint extends string | never,
    _TPayloads
> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string, payloads: _TPayloads }) => void | Promise<void>

type EntityAction_Command_AuthFunc<_TReqCtx, _TEndPoint extends string | never> = (options: { context: _TReqCtx, endpoint?: _TEndPoint, entityId: string }) => boolean | Promise<boolean>

export class EntityAction_Command<
    _TReqCtx,
    _TEndPoint extends string | never,
    _TPayloads
> extends EntityAction<_TReqCtx> {

    _spec: Partial<Spec_EntityCommand_Execute>;
    _payloads: WritePayloadBuilders;
    _endpoints?: EndPoints<unknown, _TEndPoint>;
    _auth?: EntityAction_Command_AuthFunc<_TReqCtx, _TEndPoint>
    _handle?: EntityAction_Command_HandleFunc<_TReqCtx, _TEndPoint, _TPayloads>;

    static create<TReqCtx, TEndPoint extends string | never>(action: string) {
        return new EntityAction_Command<TReqCtx, TEndPoint, unknown>(action);
    }

    private constructor(action: string) {
        super();
        this._spec = {
            command: 'execute',
            action: action,
            // endpoints,function,id,name,payloads,
        };
        this._payloads = {};
    }
    
    name(val: string): this {
        this._spec.name = val;
        return this;
    }
    
    endpoints<T extends _TEndPoint>(val: EndPoints<_TEndPoint, T>): EntityAction_Command<_TReqCtx, EndPoint<typeof val>, _TPayloads> {
        const casted = this as unknown as EntityAction_Command<_TReqCtx, EndPoint<typeof val>, _TPayloads>;
        casted._endpoints = val;
        return casted;
    }

    function(val: string): this {
        this._spec.function = val;
        return this;
    }

    payloads<T extends WritePayloadBuilders>(val: T): EntityAction_Command<_TReqCtx, _TEndPoint, WritePayloads<T>> {
        this._payloads = val;
        return this as EntityAction_Command<_TReqCtx, _TEndPoint, WritePayloads<T>>;
    }

    auth(handler: EntityAction_Command_AuthFunc<_TReqCtx, _TEndPoint>): this {
        this._auth = handler;
        return this;
    }

    handle(handler: EntityAction_Command_HandleFunc<_TReqCtx, _TEndPoint, _TPayloads>): this {
        this._handle = handler;
        return this;
    }
    
}

export class EntityAction_Update {

}

export class EntityAction_Delete {

}

export class EntityAction_Create {

}

export class EntityAction_GlobalCommand {

}

export class EntityAction_Query {

}