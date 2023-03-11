
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