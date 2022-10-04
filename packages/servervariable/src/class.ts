import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { isServerVariableObject, ServerVariableObjectType } from './schema'

export class ServerVariable<T extends ServerVariableObjectType> extends BaseObject<T> {
  /**
   * An enumeration of string values to be used if the substitution options are from a
   * limited set. The array MUST NOT be empty.
   *
   * {@link https://spec.openapis.org/oas/latest.html#server-variable-object Server
   * Variable Object}
   */
  enum?: T['enum']

  /**
   * REQUIRED. The default value to use for substitution, which SHALL be sent if an
   * alternate value is not supplied. Note this behavior is different than the Schema
   * Object’s treatment of default values, because in those cases parameter values are
   * optional. If the enum is defined, the value MUST exist in the enum’s values.
   *
   * {@link https://spec.openapis.org/oas/latest.html#server-variable-object Server
   * Variable Object}
   */
  default: T['default']

  /**
   * 	An optional description for the server variable. CommonMark syntax MAY be used
   * 	for rich text representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#server-variable-object Server
   * Variable Object}
   */
  description?: T['description']

  constructor (data: ServerVariableObjectType) {
    super()

    this.default = data.default

    if (data.enum != null) {
      this.enum = data.enum
    }

    if (data.description != null) {
      this.description = data.description
    }
  }

  static from<T extends ServerVariableObjectType = ServerVariableObjectType> (data: unknown): ServerVariable<T> {
    const valid = ServerVariable.validator.Check(data)
    if (!valid) throw new TypeCheckError(ServerVariable.validator, data)
    return new ServerVariable(data)
  }

  static validator = isServerVariableObject

  /**
   * Creates a copy of the instance with the enum added.
   *
   * @template T, U
   * @param {U} data
   * @returns {ServerVariable<T & { enum: [...NonNullable<T['enum']>, U] }>}
   */
  $enum<U extends ReadonlyArray<string>>(...data: U): ServerVariable<T & { enum: [...NonNullable<T['enum']>, U] }> {
    const json = this.json()
    const values = [...(json.enum ?? []), ...data]
    return new ServerVariable({ ...json, enum: values })
  }

  /**
   * Creates a copy of the instance with the default added.
   *
   * @template T, U
   * @param {U} value
   * @returns {ServerVariable<T & { default: U }>}
   */
  $default<U extends string> (value: U): ServerVariable<T & { default: U }> {
    return new ServerVariable({ ...this.json(), default: value })
  }

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {ServerVariable<T & { description: U }>}
   */
  $description<U extends string>(description: U): ServerVariable<T & { description: U }> {
    return new ServerVariable({ ...this.json(), description })
  }
}
