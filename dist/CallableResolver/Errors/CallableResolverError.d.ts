/// <reference types="node" />
export declare class CallableResolverError extends Error {
    private _identifier;
    constructor(_identifier: any);
    readonly identifier: string;
}
