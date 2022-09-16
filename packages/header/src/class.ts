import { Base, TypeCheckError } from '@byu-oit/openapi.common'
import { Example } from '@byu-oit/openapi.example'
import { ParameterStyleType } from '@byu-oit/openapi.parameter'
import { SecuritySchemeObjectType } from '@byu-oit/openapi.securityscheme'
import { HeaderObjectType, isHeaderObject } from './schema'

export class Header<T extends HeaderObjectType> extends Base implements HeaderObjectType {
  description?: string
  required?: T['required']
  deprecated?: T['deprecated']
  allowEmptyValue?: T['allowEmptyValue']
  style?: T['style']
  explode?: T['explode']
  allowReserved?: T['allowReserved']
  schema?: T['schema']
  example?: T['example']
  examples?: T['examples']

  constructor (data?: HeaderObjectType) {
    super()
    Object.assign(this, data)
  }

  static from<T extends HeaderObjectType = HeaderObjectType> (data: unknown): Header<T> {
    const valid = Header.validator.Check(data)
    if (!valid) throw new TypeCheckError(Header.validator, data)
    return new Header(data) 
  }

  static validator = isHeaderObject

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

  $style<U extends ParameterStyleType> (style: U): Header<T & { style: U }> {
    return new Header({ ...this.json(), style })
  }

  $explode<U extends boolean> (explode: U): Header<T & { explode: U }> {
    return new Header({ ...this.json(), explode })
  }

  $allowReserved<U extends boolean> (allowReserved: U): Header<T & { allowReserved: U }> {
    return new Header({ ...this.json(), allowReserved })
  }

  $schema<U extends SecuritySchemeObjectType> (schema: U): Header<T & { schema: U }> {
    return new Header({ ...this.json(), schema })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): Header<T> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new Header({ ...this.json(), examples })
  }
}
