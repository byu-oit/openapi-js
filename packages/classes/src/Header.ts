import * as S from '@byu-oit/openapi-schemas'
import { TSchema } from '@sinclair/typebox'
import { Base } from './Base'
import { Example } from './Example'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class Header<T extends S.Header> extends Base implements S.Header {
  description?: string
  required?: T['required']
  deprecated?: T['deprecated']
  allowEmptyValue?: T['allowEmptyValue']
  style?: T['style']
  explode?: T['explode']
  allowReserved?: T['allowReserved']
  schema?: T['schema']
  example?: any
  examples?: Record<string, Example>

  constructor (data?: S.Header) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.Header = S.Header> (data: unknown): Header<T> {
    const valid = Header.validator.Check(data)
    if (!valid) throw new TypeCheckError(Header.validator, data)
    return new Header(data) as Header<T>
  }

  static validator = TypeCompiler.Compile(S.THeader)

  $description (description: string): Header<T> {
    return new Header({ ...this.json(), description })
  }

  $required<U extends boolean> (required: U): Header<T & { required: U }> {
    return new Header({ ...this.json(), required })
  }

  $deprecated<U extends boolean> (deprecated: U): Header<T & { deprecated: U }> {
    return new Header({ ...this.json(), deprecated })
  }

  $allowEmptyValue<U extends boolean> (allowEmptyValue: U): Header<T & { allowEmptyValue: U }> {
    return new Header({ ...this.json(), allowEmptyValue })
  }

  $style<U extends S.ParameterStyle> (style: U): Header<T & { style: U }> {
    return new Header({ ...this.json(), style })
  }

  $explode<U extends boolean> (explode: U): Header<T & { explode: U }> {
    return new Header({ ...this.json(), explode })
  }

  $allowReserved<U extends boolean> (allowReserved: U): Header<T & { allowReserved: U }> {
    return new Header({ ...this.json(), allowReserved })
  }

  $schema<U extends TSchema> (schema: U): Header<T & { schema: U }> {
    return new Header({ ...this.json(), schema })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): Header<T> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new Header({ ...this.json(), examples })
  }
}
