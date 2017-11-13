
import { CallableResolverError } from './CallableResolverError';

export class CanNotResolveCallableResolverError extends CallableResolverError {

  constructor(identifier: any) {
    super(identifier);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CanNotResolveCallableResolverError.prototype);
  }

}
