
export class CallableResolverError extends Error {
  constructor(private _identifier: any) {
    super(`Unable to find callable for ${_identifier}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CallableResolverError.prototype);
  }

  get identifier(): string {
    return this._identifier;
  }
}
