import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { isServerVariableObject, ServerVariableObjectType } from './schema'

export class ServerVariable<T extends ServerVariableObjectType> extends BaseObject<T> {
  enum?: T['enum']
  default: T['default']
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

  $enum<U extends ReadonlyArray<string>>(...data: U): ServerVariable<T & { enum: [...NonNullable<T['enum']>, U] }> {
    const json = this.json()
    const values = [...(json.enum ?? []), ...data]
    return new ServerVariable({ ...json, enum: values })
  }

  $default<U extends string> (value: U): ServerVariable<T & { default: U }> {
    return new ServerVariable({ ...this.json(), default: value })
  }

  $description<U extends string>(description: U): ServerVariable<T & { description: U }> {
    return new ServerVariable({ ...this.json(), description })
  }
}
