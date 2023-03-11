import { SpecBuilder_Entity, SpecBuilder_EntitySection, SpecBuilder_MenuItem, SpecBuilder_Spec, SpecBuilder_WritePayload } from "./spec-builders";

const x = SpecBuilder_Spec.create()
    .entity(
        SpecBuilder_Entity
            .create('entity1')
            .sections({
                section1: SpecBuilder_EntitySection.create()
                    .payloads({
                        payload1: SpecBuilder_WritePayload
                            .create()
                            .name('Payload1'),
                        payload2: SpecBuilder_WritePayload
                            .create()
                    })
            })
    )
    .entity(
        SpecBuilder_Entity
            .create('entity1')
            .sections({
                section1: SpecBuilder_EntitySection.create()
                    .payloads({
                        payload1: SpecBuilder_WritePayload
                            .create()
                            .name('Payload1'),
                        payload2: SpecBuilder_WritePayload
                            .create()
                    })
            })
            .actions(
                
            )
    )
    .menu(
        SpecBuilder_MenuItem
            .create()
            .name('something')
            .item(
                SpecBuilder_MenuItem
                    .create()
                    .name('something')
                    .endpoint('something')
            )
            .item(
                SpecBuilder_MenuItem
                    .create()
                    .name('something')
                    .endpoint('entity')
            )
    )