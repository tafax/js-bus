
export class CallableResolverError extends Error {
  constructor(private _identifier: any) {
    super(`Unable to find callable for ${_identifier}`);
  }

  get identifier(): string {
    return this._identifier;
  }
}
