export type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> :
    // eslint-disable-next-line @typescript-eslint/ban-types
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

export type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Prettify<T> = T extends object ?  {[K in keyof T]: Prettify<T[K]>} : T;

export type MaybePromise<T> = T | Promise<T>;

export type ReplaceField<T, TKey extends keyof T, TNew> = Omit<T, TKey> & Record<TKey, TNew>;