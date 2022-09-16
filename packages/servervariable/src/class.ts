import { Base, Push, TypeCheckError } from '@byu-oit/openapi.common'
import { isServerVariableObject, ServerVariableObjectType } from './schema'

export class ServerVariable<T extends ServerVariableObjectType> extends Base implements ServerVariableObjectType {
  enum?: T['enum']
  default!: T['default']
  description?: string

  constructor (data: ServerVariableObjectType)
  constructor (def: string, data?: Partial<ServerVariableObjectType>)
  constructor (def: string | ServerVariableObjectType, data?: Partial<ServerVariableObjectType>) {
    super()
    const serverVariable = typeof def === 'string'
      ? { ...data, default: def }
      : def
    Object.assign(this, serverVariable)
  }

  static from<T extends ServerVariableObjectType = ServerVariableObjectType> (data: unknown): ServerVariable<T> {
    const valid = ServerVariable.validator.Check(data)
    if (!valid) throw new TypeCheckError(ServerVariable.validator, data)
    return new ServerVariable(data) 
  }

  static validator = isServerVariableObject

  $enum<U extends ReadonlyArray<string>>(...values: U): ServerVariable<T & { enum: Push<T['enum'], U> }> {
    return new ServerVariable({ ...this.json(), enum: values })
  }

  $default<U extends string> (value: U): ServerVariable<T & { default: U }> {
    return new ServerVariable({ ...this.json(), default: value })
  }

  $description (description: string): ServerVariable<T> {
    return new ServerVariable({ ...this.json(), description })
  }
}
