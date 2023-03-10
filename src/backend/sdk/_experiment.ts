ctx.createEntity({
    name: "123",
    singleton: true,
    entity: {
        section1: cms
            .entitySection({
                name: 'Section 1'
            })
            .payloads({
                pay1: cms.writePayload({ name: "something", placeholder: "xxx", readOnly: true }).typeScheme(typeScheme),
                pay2: cms.writePayload({ id: "something", name: "something", placeholder: "xxx" }).typeScheme(typeScheme)
            }),
        section2: cms
            .entitySection({ name: 'Section 1'})
            .payloads({
                pay1: cms.writePayload({ id: "something", name: "something", placeholder: "xxx" }).typeScheme(typeScheme),
                pay2: cms.writePayload({ id: "something", name: "something", placeholder: "xxx" }).typeScheme(typeScheme)
            }),
    },
    readEntity: {
        something1: cms.readPayload({ name: "something" }).typeScheme(typeScheme),
        something2: cms.readPayload({ name: "something"}).typeScheme(typeScheme)
    },
    endpoints: ["", ""],
}).actions([
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
            something: cms.writePayload({ name: "something" }).typeScheme(typeScheme),
            something2: cms.writePayload({ name: "something" }).typeScheme(typeScheme)
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
            something: cms.writePayload({ name: "something" }).typeScheme(typeScheme),
            something2: cms.writePayload({ name: "something" }).typeScheme(typeScheme)
        })
        .auth(
            () => true
        )
        .handle(({ payloads, ctx }) => {}),
    ctx.command
        .delete()
        .payloads({
            something: cms.writePayload({ name: "something" }).typeScheme(typeScheme),
            something2: cms.writePayload({ name: "something" }).typeScheme(typeScheme)
        })
        .auth(() => true)
        .handle(({ payloads, ctx }) => {}),
    ctx.command
        .create()
        .payloads({
            something: cms.writePayload({ name: "something" }).typeScheme(typeScheme),
            something2: cms.writePayload({ name: "something" }).typeScheme(typeScheme)
        })
        .auth(() => true)
        .handle(({ payloads, ctx }) => {}),
    ctx.query()
        .filter()
        .filter()
        .auth(() => true)
        .query(({ payloads, ctx }) => {}),
]);