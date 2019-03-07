
export class JsBusError extends Error {

  constructor(message: string) {

    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, JsBusError.prototype);
  }

}
