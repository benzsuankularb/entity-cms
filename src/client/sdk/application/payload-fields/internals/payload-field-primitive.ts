import { PayloadField_Primitive } from "../interfaces";
import { PayloadFieldInternal, PayloadFieldInternalOptions } from './payload-field-base';


export class PayloadFieldInternal_Primitive<T> extends PayloadFieldInternal<T> implements PayloadField_Primitive<T> {

    constructor(options: PayloadFieldInternalOptions<T>) {
        super(options);
    }

    async suggest(): Promise<T[]> {
        if (!this.meta.suggestion) {
            throw 'Unable to suggest non-suggestable payload field';
        }

        throw 'Suggestion is currenly unsupported.';
    }
}
