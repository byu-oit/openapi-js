import * as S from '@byu-oit/openapi-schemas'
import { Type } from '@sinclair/typebox'
import { Example } from './Example'
import { Base } from './Base'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class Parameter<T extends S.Parameter> extends Base implements S.Parameter {
  name!: T['name']
  in!: T['in']
  description?: string
  required?: T['required']
  deprecated?: T['deprecated']
  allowEmptyValue?: T['allowEmptyValue']
  style?: T['style']
  explode?: T['explode']
  allowReserved?: T['allowReserved']
  schema?: T['name']
  example?: any
  examples?: Record<string, S.Example>

  constructor (data: T)
  constructor (name: T['name'], location: T['in'], data?: T)
  constructor (value: string | T, location?: T['in'], data?: T) {
    super()
    const parameter = typeof value === 'string'
      ? {
          ...data,
          name: value,
          in: location,
          ...data?.schema != null && { schema: Type.Strict(data.schema) }
        }
      : value
    Object.assign(this, parameter)
  }

  static from<T extends S.Parameter = S.Parameter> (data: unknown): Parameter<T> {
    const valid = Parameter.validator.Check(data)
    if (!valid) throw new TypeCheckError(Parameter.validator, data)
    return new Parameter(data) as Parameter<T>
  }

  static validator = TypeCompiler.Compile(S.TParameter)

  static query<T extends Omit<S.Parameter, 'in'>> (data: T): Parameter<T & { in: 'query' }> {
    return new Parameter<T & { in: 'query' }>({...data, in: 'query' })
  }

  static header<T extends Omit<S.Parameter, 'in'>> (data: T): Parameter<T & { in: 'header' }> {
    return new Parameter({...data, in: 'header' })
  }

  static path<T extends Omit<S.Parameter, 'in'>> (data: T): Parameter<T & { in: 'path' }> {
    return new Parameter({...data, in: 'path' })
  }

  static cookie<T extends Omit<S.Parameter, 'in'>> (data: T): Parameter<T & { in: 'cookie' }> {
    return new Parameter({...data, in: 'cookie' })
  }

  $name<U extends string = string>(name: U): Parameter<T & { name: U }> {
    return new Parameter<T & { name: U }>({ ...this.json(), name })
  }

  $in<L extends S.ParameterLocation = S.ParameterLocation> (location: L): Parameter<T & { in: L }> {
    return new Parameter({ ...this.json(), in: location })
  }

  $description (description: string): Parameter<T> {
    return new Parameter({ ...this.json(), description })
  }

  $required<U extends boolean = boolean>(required: U): Parameter<T & { required: U }> {
    return new Parameter({ ...this.json(), required })
  }

  $deprecated<U extends boolean = boolean> (deprecated: U): Parameter<T & { deprecated: U }> {
    return new Parameter({ ...this.json(), deprecated })
  }

  $allowEmptyValue<U extends boolean = boolean> (allowEmptyValue: U): Parameter<T & { allowEmptyValue: U }> {
    return new Parameter({ ...this.json(), allowEmptyValue })
  }

  $style<U extends S.ParameterStyle = S.ParameterStyle>(style: U): Parameter<T & { style: U }> {
    return new Parameter({ ...this.json(), style })
  }

  $explode<U extends boolean = boolean> (explode: U): Parameter<T & { explode: U }> {
    return new Parameter({ ...this.json(), explode })
  }

  $allowReserved<U extends boolean = boolean> (allowReserved: U): Parameter<T & { allowReserved: U }> {
    return new Parameter({ ...this.json(), allowReserved })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): Parameter<T> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new Parameter({ ...this.json(), examples })
  }
}
