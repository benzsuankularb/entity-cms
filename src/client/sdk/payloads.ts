import { createPayloadsValidator, ValidatePayloadsFunction } from '../../common/payload-validator';
import { Spec_WritePayload } from '../../specs';
import { EventEmitter } from "../utils/event";
import { EntityCMSContext } from "./common";
import { ReadEntity } from './entity';
import { PayloadFieldInternal, PayloadFieldInternal_Binary, PayloadFieldInternal_Entity, PayloadFieldInternal_Value, PayloadField_Unknown } from './payload';

export interface Payloads {
    readonly onValidatedUpdated: EventEmitter;
    readonly validated: boolean;
    readonly fields: readonly PayloadField_Unknown[];
}

export interface PayloadsInternalOptions {
    context: EntityCMSContext;
    data: {[id: string]: unknown};
    listEntities: { [entity: string]: ReadEntity };
    fieldSpecs: Spec_WritePayload[];
}

export class PayloadsInternal implements Payloads {
    readonly onValidatedUpdated: EventEmitter;
    private _fieldSpecs: Spec_WritePayload[];
    private _fields: { [id: string]: PayloadFieldInternal<unknown> };
    private _validatePayloads: ValidatePayloadsFunction;
    validated: boolean;

    constructor(options: PayloadsInternalOptions) {
        this._fieldSpecs = options.fieldSpecs;
        this.onValidatedUpdated = new EventEmitter();
        this._validatePayloads = createPayloadsValidator(this._fieldSpecs);
        this.validated = false;
        this._fields = {};

        // create fields
        for (const fieldSpec of this._fieldSpecs) {
            const type = fieldSpec.typeScheme.type;
            const fieldOptions = {
                context: options.context,
                initialValue: options.data[fieldSpec.id] as never,
                id: fieldSpec.id,
                meta: {
                    hidden: false,
                    name: fieldSpec.name,
                    readOnly: fieldSpec.readOnly ?? false,
                    description: fieldSpec.description,
                    placeholder: fieldSpec.placeholder,
                    suggestion: fieldSpec.suggestion,
                    suffix: fieldSpec.suffix,
                },
                parent: this,
                typeScheme: fieldSpec.typeScheme
            };
            let field: PayloadFieldInternal<unknown>
            if (type === 'binary') {
                field = new PayloadFieldInternal_Binary(fieldOptions);
            } else if (type === 'entity') {
                field = new PayloadFieldInternal_Entity(fieldOptions);
            } else {
                field = new PayloadFieldInternal_Value(fieldOptions);
            }
            field.onValueUpdated.addListener(this._revalidate.bind(this));
            this._fields[fieldSpec.id] = field;
        }
    }
    
    get fields(): PayloadField_Unknown[] {
        return Object.values(this._fields);
    }

    private _revalidate() {
        const values = this.values();
        const [_invalidPayloadIds] = this._validatePayloads(values);
        const invalidPayloadIds = new Set(_invalidPayloadIds);
        Object.values(this._fields).forEach(field => {
            const isValidated = !invalidPayloadIds.has(field.id);
            field.setValidated(isValidated);
        });
        this._setValidated(_invalidPayloadIds.length === 0);
    }

    private _setValidated(val: boolean) {
        if (this.validated === val) {
            return;
        }
        this.validated = val;
        this.onValidatedUpdated.invoke();
    }

    values() {
        const result: { [id: string]: unknown } = {};
        Object.values(this._fields).forEach(field => result[field.id] = field.value);
        return result;
    }

}