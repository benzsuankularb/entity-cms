import { entity, EntitySection, entitySection, WritePayload, writePayload, WritePayloads } from "./entity-spec-builders";

const x = entity({
    name: '',
    entity: {
        section: entitySection({
            name: ''
        }).payloads({
            some: writePayload({
                name: '',
                description: '',
                suffix: ''
            }).typeScheme({ type: 'string'})
        })
    }
})

// type xx = typeof x

const a = entitySection({
    name: ''
}).payloads({
    some: writePayload({
        name: '',
        description: '',
        suffix: ''
    }).typeScheme({ type: 'string'}),
    thing: writePayload({
        name: '',
        description: '',
        suffix: ''
    }).typeScheme({ type: 'number'})
});

type a = EntitySection<typeof a>;

///

const z = {
    some: writePayload({
        name: '',
        description: '',
        suffix: ''
    }).typeScheme({ type: 'string'}),
    thing: writePayload({
        name: '',
        description: '',
        suffix: ''
    }).typeScheme({ type: 'number'})
};

type z = WritePayloads<typeof z>




///

const b = writePayload({
    name: '',
    description: '',
    suffix: ''
}).typeScheme({ type: 'string'});

type b = WritePayload<typeof b>;