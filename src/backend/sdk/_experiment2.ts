import { EntitySections, ReadEntity } from "./spec-builders";

const MyEntity = {
    section1: ctx.entitySection()
        .name("section")
        .payloads({
            pay1: ctx.writePayload()
                .name ("Pay1")
                .placeholder("???")
                .readOnly()
                .typeScheme(
                    ctx.typeScheme
                        .integer()
                        .max()
                ),
            pay2: ctx.writePayload()
                .name ("Pay1")
                .typeScheme(
                    ctx.typeScheme
                        .integer()
                        .max()
                )
        }),
    section2: ctx.entitySection()
        .name("section")
        .payloads({
            pay1: ctx.writePayload({ name: "something", placeholder: "xxx", readOnly: true }).typeScheme(typeScheme),
            pay2: ctx.writePayload({ id: "something", name: "something", placeholder: "xxx" }).typeScheme(typeScheme)
        }),
};

type MyEntity = EntitySections<typeof MyEntity>

const MyReadEntity = {
    something1: ctx
        .readPayload()
        .name("something")
        .typeScheme(typeScheme),
    something2: ctx.readPayload()
        .name("something")
        .typeScheme(typeScheme)
}

type MyReadEntity = ReadEntity<typeof MyReadEntity>

const etc = ctx.entityContext<MyEntity, MyReadEntity>();

ctx.entity("123")
    .name("string")
    .singleton()
    .entity()
    .readEntity()
    .actions(ctx => [
        ctx.command
            .update("section1")
            .endpoints()
            .auth(() => [true, false])
            .query()
            .mutate()
        ctx.command
            .entity("something")
            .name("Something")
            .payloads({
                something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
                something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
            })
            .suggestion(
                "number",
                (payloads, ctx, payloadId) => {}
            )
            .suggestion(
                "number",
                (payloads, ctx, payloadId) => {}
            )
            .suggestion(
                "number",
                (payloads, ctx, payloadId) => {}
            )
            .auth(
                (ctx, id) => true
            )
            .handle(
                ({ payloads, ctx }) => {}
            ),
        ctx.command
            .global("something")
            .name("Something")
            .payloads({
                something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
                something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
            })
            .auth(
                () => true
            )
            .handle(({ payloads, ctx }) => {}),
        ctx.command
            .delete()
            .payloads({
                something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
                something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
            })
            .auth(() => true)
            .handle(({ payloads, ctx }) => {}),
        ctx.command
            .create()
            .payloads({
                something: ctx.writePayload({ name: "something" }).typeScheme(typeScheme),
                something2: ctx.writePayload({ name: "something" }).typeScheme(typeScheme)
            })
            .auth(() => true)
            .handle(({ payloads, ctx }) => {}),
        ctx.query()
            .name("All")
            .filter(
                ctx.filter("field1")
                    .allowRange()
                    .min()
                    .max()
            )
            .filter(
                ctx.filter("field1")
                    .allowRange()
                    .min()
                    .max()
            )
            .auth(() => true)
            .query(({ payloads, ctx }) => {}),
    ]);