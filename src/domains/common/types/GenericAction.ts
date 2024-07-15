export type GenericAction<T, P = undefined> = {
    type: T;
    payload?: P;
};