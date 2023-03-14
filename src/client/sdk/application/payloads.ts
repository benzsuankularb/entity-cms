import { createPayloadsValidator, ValidatePayloadsFunction } from '../../../common/payloads-validator';
import { Spec_WritePayload } from '../../../common/specs';
import { EventEmitter } from "../../../utils/event-emitter";
import { ApplicationContext } from "./context";
import { PayloadField_Unknown } from './payload-fields/interfaces';
import { PayloadFieldInternal, PayloadFieldInternal_Binary, PayloadFieldInternal_Entity, PayloadFieldInternal_Primitive } from './payload-fields/internals';

export interface PayloadsOptions {
    context: ApplicationContext;
    specs: Spec_WritePayload[];
}

export class Payloads {
    
    private readonly _validatePayloads: ValidatePayloadsFunction;
    private readonly _fields: { [id: string]: PayloadFieldInternal<unknown> };
    private readonly _fieldSpecs: Spec_WritePayload[];
    
    private _validated: boolean;

    readonly onValidatedUpdated: EventEmitter<boolean>;

    get validated(): boolean {
        return this._validated;
    }

    get fields(): readonly PayloadField_Unknown[] {
        return Object.values(this._fields);
    }

    constructor(options: PayloadsOptions) {
        this.onValidatedUpdated = new EventEmitter();
        this._validated = false;
        
        this._validatePayloads = createPayloadsValidator(options.specs);
        this._fieldSpecs = options.specs;
        this._fields = {};

        // create fields
        for (const fieldSpec of this._fieldSpecs) {
            const type = fieldSpec.typeScheme.type;
            const fieldOptions = {
                context: options.context,
                // initialValue: options.initialValues[fieldSpec.id] as never,
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
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let field: PayloadFieldInternal<any>;
            if (type === 'binary') {
                field = new PayloadFieldInternal_Binary(fieldOptions);
            } else if (type === 'entity') {
                field = new PayloadFieldInternal_Entity(fieldOptions);
            } else {
                field = new PayloadFieldInternal_Primitive<unknown>(fieldOptions);
            }
            
            field.onValueUpdated.addListener(this._revalidate.bind(this));
            this._fields[fieldSpec.id] = field;
        }
    }
    
    private _revalidate() {
        const values = this.values();
        const [valid, _invalidPayloadIds] = this._validatePayloads(values);
        const invalidPayloadIds = new Set(_invalidPayloadIds);
        Object.values(this._fields).forEach(field => {
            const isValidated = !invalidPayloadIds.has(field.payloadId);
            field.setValidated(isValidated);
        });
        this._setValidated(valid);
    }

    private _setValidated(val: boolean) {
        if (this._validated === val) {
            return;
        }
        this._validated = val;
        this.onValidatedUpdated.invoke(val);
    }

    values() {
        const result: { [id: string]: unknown } = {};
        Object.values(this._fields).forEach(field => result[field.payloadId] = field.value);
        return result;
    }

}