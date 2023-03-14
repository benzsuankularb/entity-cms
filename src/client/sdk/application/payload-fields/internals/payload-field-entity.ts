import { ReadEntity } from '../../entity';
import { PayloadField_Entity } from "../interfaces";
import { PayloadFieldInternal, PayloadFieldInternalOptions } from './payload-field-base';


export class PayloadFieldInternal_Entity extends PayloadFieldInternal<ReadEntity | undefined> implements PayloadField_Entity {

    private _suggestions: { [id: string]: ReadEntity; };

    constructor(options: PayloadFieldInternalOptions<ReadEntity | undefined>) {
        super(options);
        this._suggestions = {};
    }

    setValueFromSuggestion(entityId: string): void {
        const entity = this._suggestions[entityId];
        if (!entity) {
            throw `No entity id ${entityId} in the suggestion`;
        }
        this.setValue(entity);
    }

    async suggest(): Promise<ReadEntity[]> {
        if (!this.meta.suggestion) {
            throw 'Unable to suggest non-suggestable payload field';
        }

        throw 'Suggestion is currenly unsupported.';
    }
}
