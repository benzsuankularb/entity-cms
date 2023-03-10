import * as Spec from '../../specs';

export type CustomFunction = () => Promise<void>;

export class EntityCMSContext {
    spec: Spec.Spec_Root;
    functions: { [id: string]: CustomFunction; };

    constructor(options: { spec: Spec.Spec_Root; }) {
        this.spec = options.spec;
        this.functions = {};
    }
}