
export type EndPoint<T extends EndPoints<unknown, string | never>> = T  extends EndPoints<unknown, infer U > ? U: never;


export class EndPoints<_TBase, T extends _TBase> {
    
    _endpoints: Set<T>;

    constructor(val: T) {
        this._endpoints = new Set([val]);
    }

    static create<_TBase extends string, _T extends _TBase>(val: _T): EndPoints<_TBase, _T> {
        return new EndPoints<_TBase, _T>(val);
    }
    
    and<_T extends _TBase>(endpoint: _T): EndPoints<_TBase, _T | T> {
        const casted = this as EndPoints<_TBase, _T | T>;
        casted._endpoints.add(endpoint);
        return casted;
    }

}