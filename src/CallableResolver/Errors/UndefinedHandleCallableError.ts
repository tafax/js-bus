
import { CallableResolverError } from './CallableResolverError';

export class UndefinedHandleCallableError extends CallableResolverError {

  constructor(identifier: any) {
    super(identifier);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UndefinedHandleCallableError.prototype);
  }

}
