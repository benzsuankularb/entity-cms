import { createSpecBuilderContext } from "./spec-builders/context";

const ctx = createSpecBuilderContext<{ user: string }>();
const entity = ctx
    .entity('e1')
    .singleton()
    .sections({
        sec1: ctx.section()
            .name('')
            .payloads({
                pay1: ctx
                    .writePayload()
                    .name('Pay1')
                    .typeScheme({ type: 'string' })
            })
    })
    .readEntity({
        pay1: ctx
            .readPayload()
            .typeScheme({ type: 'number' })
    })
    .actions(ctx => [
        ctx.section('sec1')
            .query(async ({ context }) => {
                return {
                    pay1: context.user
                }
            }),
        ctx.command('sec1')
            .payloads({
                pay1: ctx.writePayload()
                    .name('someone')
                    .typeScheme({ type: 'string' })
            })
            .handle(({ payloads}) => {
                console.log(payloads.pay1)
            })
    ]);


// ctx.entity("123")
//     .name("string")
//     .endpoints()
//     .singleton()
//     .sections({
//         section1: ctx.section()
//             .name("section")
//             .payloads({
//                 pay1: ctx.writePayload()
//                     .name ("Pay1")
//                     .placeholder("???")
//                     .readOnly()
//                     .typeScheme(
//                         ctx.typeScheme
//                             .integer()
//                             .max()
//                     ),
//                 pay2: ctx.writePayload()
//                     .name ("Pay1")
//                     .typeScheme(
//                         ctx.typeScheme
//                             .integer()
//                             .max()
//                     )
//             }),
//         section2: ctx.section()
//             .name("section")
//             .payloads({
//                 pay1: ctx.writePayload({ name: "something", placeholder: "xxx", readOnly: true }).typeScheme(typeScheme),
//                 pay2: ctx.writePayload({ id: "something", name: "something", placeholder: "xxx" }).typeScheme(typeScheme)
//             }),
//     })
//     .readEntity({
//         something1: ctx
//             .readPayload()
//             .name("something")
//             .typeScheme(typeScheme),
//         something2: ctx.readPayload()
//             .name("something")
//             .typeScheme(typeScheme)
//     })
//     .readDisplay("{pay1} - {pay2}")
//     .actions(ctx => [
//         ctx.command
//             .update("section1")
//             .endpoints()
//             .auth(() => [true, false])
//             .filterReadEntity()
//             .filterEntity()
//             .filter()
//             .query()
//             .mutate()
//         ctx.command
//             .entity("something")
//             .name("Something")
//             .payloads({
//                 something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//                 something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//             })
//             .suggestion(
//                 "number",
//                 (payloads, ctx, payloadId) => {}
//             )
//             .suggestion(
//                 "number",
//                 (payloads, ctx, payloadId) => {}
//             )
//             .suggestion(
//                 "number",
//                 (payloads, ctx, payloadId) => {}
//             )
//             .auth(
//                 (ctx, id) => true
//             )
//             .handle(
//                 ({ payloads, ctx }) => {}
//             ),
//         ctx.command
//             .global("something")
//             .name("Something")
//             .payloads({
//                 something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//                 something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//             })
//             .auth(
//                 () => true
//             )
//             .handle(({ payloads, ctx }) => {}),
//         ctx.command
//             .delete()
//             .payloads({
//                 something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//                 something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//             })
//             .auth(() => true)
//             .handle(({ payloads, ctx }) => {}),
//         ctx.command
//             .create()
//             .payloads({
//                 something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
//                 something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
//             })
//             .auth(() => true)
//             .handle(({ payloads, ctx }) => {}),
//         ctx.query()
//             .name("All")
//             .filters(
//                 ctx.filter("field1")
//                     .allowRange()
//                     .min()
//                     .max(),
//                 ctx.filter("field1")
//                     .allowRange()
//                     .min()
//                     .max(),
//             )
//             .auth(() => true)
//             .query(({ payloads, ctx }) => {}),
//     ]);