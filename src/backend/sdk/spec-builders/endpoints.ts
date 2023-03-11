
export type EndPoint<T extends SpecBuilder_EndPoints<unknown, string | never>> = T  extends SpecBuilder_EndPoints<unknown, infer U > ? U: never;

export class SpecBuilder_EndPoints<_TBase, T extends _TBase> {

    _type = 'endpoints';
    _endpoints: Set<T>;

    static create<_TBase extends string, _T extends _TBase>(val: _T): SpecBuilder_EndPoints<_TBase, _T> {
        return new SpecBuilder_EndPoints<_TBase, _T>(val);
    }
    
    private constructor(val: T) {
        this._endpoints = new Set([val]);
    }
    
    and<_T extends _TBase>(endpoint: _T): SpecBuilder_EndPoints<_TBase, _T | T> {
        const casted = this as SpecBuilder_EndPoints<_TBase, _T | T>;
        casted._endpoints.add(endpoint);
        return casted;
    }

}