
export type EndPoint<T extends EndPoints<unknown, string | never>> = T  extends EndPoints<unknown, infer U > ? U: never;


export class EndPoints<_TBase, T extends _TBase> {
    
    _endpoints: Set<T>;

    constructor() {
        this._endpoints = new Set();
    }

    static create<_TBase extends string>(): EndPoints<_TBase, never> {
        return new EndPoints<_TBase, never>();
    }
    
    and<_T extends _TBase>(endpoint: _T): EndPoints<_TBase, _T | T> {
        const casted = this as EndPoints<_TBase, _T | T>;
        casted._endpoints.add(endpoint);
        return casted;
    }

}