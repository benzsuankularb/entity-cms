import { PayloadField_Binary } from "../interfaces";
import { PayloadFieldInternal, PayloadFieldInternalOptions } from './payload-field-base';


export class PayloadFieldInternal_Binary extends PayloadFieldInternal<string | undefined> implements PayloadField_Binary {

    constructor(options: PayloadFieldInternalOptions<string | undefined>) {
        super(options);
    }

    upload(file: File): Promise<void> {
        throw new Error("Method not implemented.");
    }

    download(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
