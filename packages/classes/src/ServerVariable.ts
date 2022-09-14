import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { Push, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class ServerVariable<T extends S.ServerVariable> extends Base implements S.ServerVariable {
  enum?: T['enum']
  default!: T['default']
  description?: string

  constructor (data: S.ServerVariable)
  constructor (def: string, data?: Partial<S.ServerVariable>)
  constructor (def: string | S.ServerVariable, data?: Partial<S.ServerVariable>) {
    super()
    const serverVariable = typeof def === 'string'
      ? { ...data, default: def }
      : def
    Object.assign(this, serverVariable)
  }

  static from<T extends S.ServerVariable = S.ServerVariable> (data: unknown): ServerVariable<T> {
    const valid = ServerVariable.validator.Check(data)
    if (!valid) throw new TypeCheckError(ServerVariable.validator, data)
    return new ServerVariable(data) as ServerVariable<T>
  }

  static validator = TypeCompiler.Compile(S.TServerVariable)

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
