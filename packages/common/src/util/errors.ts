import { TypeCheck } from '@sinclair/typebox/compiler/compiler'
import { ValueError } from '@sinclair/typebox/errors'
import { TSchema } from '@sinclair/typebox'

/**
 * This error is thrown any time an error is encountered during validation using the
 * TypeCompiler from TypeBox. All value errors are located on the `details` property.
 *
 * @class
 */
export class TypeCheckError<T extends TSchema = TSchema> extends TypeError {
  name = 'TypeError'
  /**
   * Contains all errors thrown when the given value does not match the shape of the
   * schema it was validated against.
   */
  details: ValueError[]

  /**
   * Creates a TypeCheckError instance.
   *
   * @param {TypeCheck<any>} compiled A TypeCheck instance used to collect error messages.
   * @param {unknown} value The data used in the validation that failed.
   * @param {string} [message] An optional message to give the TypeCheckError. The
   * default message is "Validation error encountered".
   * @constructor
   */
  constructor (compiled: TypeCheck<T>, value: unknown, message?: string) {
    super(message ?? 'Validation error encountered')
    this.details = [...compiled.Errors(value)]
    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class InvalidReferenceError extends Error {
  name = 'InvalidReferenceError'
  constructor (ref: string) {
    super(`Invalid reference ${ref}`)
    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class UnsupportedReferenceError extends Error {
  name = 'UnsupportedReferenceError'
  constructor (ref: string) {
    super(`Unsupported reference ${ref}. Only internal references are supported.`)
    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype)
  }
}
