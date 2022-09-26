import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Example, ExampleObjectType, ExampleRecord } from '@byu-oit/openapi.example'
import { ParameterStyleType } from '@byu-oit/openapi.parameter'
import { SecuritySchemeObjectType } from '@byu-oit/openapi.securityscheme'
import { HeaderObjectType, isHeaderObject } from './schema'
import {
  isReferenceObject,
  Reference,
} from '@byu-oit/openapi.reference'

export class Header<T extends HeaderObjectType> extends BaseObject<T> {
  description?: T['description']
  required?: T['required']
  deprecated?: T['deprecated']
  allowEmptyValue?: T['allowEmptyValue']
  style?: T['style']
  explode?: T['explode']
  allowReserved?: T['allowReserved']
  schema?: T['schema']
  example?: T['example']
  examples?: ExampleRecord<T['examples']>

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.required != null) {
      this.required = data.required
    }

    if (data.deprecated != null) {
      this.deprecated = data.deprecated
    }

    if (data.allowEmptyValue != null) {
      this.allowEmptyValue = data.allowEmptyValue
    }

    if (data.style != null) {
      this.style = data.style
    }

    if (data.explode != null) {
      this.explode = data.explode
    }

    if (data.allowReserved != null) {
      this.allowReserved = data.allowReserved
    }

    if (data.schema != null) {
      this.schema = data.schema
    }

    if (data.example != null) {
      this.example = data.example
    }

    if (data.examples != null) {
      this.examples = Object.entries(data.examples).reduce((agg, [basename, data]) => {
        const example = isReferenceObject.Check(data) ? new Reference(data) : new Example(data)
        return { ...agg, [basename]: example }
      }, {} as ExampleRecord<T['examples']>)
    }
  }

  static from<T extends HeaderObjectType> (data: unknown): Header<T> {
    const valid = Header.validator.Check(data)
    if (!valid) throw new TypeCheckError(Header.validator, data)
    return new Header(data) as Header<T>
  }

  static validator = isHeaderObject

  $description<U extends string>(description: U): Header<T> {
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

  $example<U extends string, V extends ExampleObjectType> (name: U, data?: V): Header<T & { examples: T['examples'] & { [P in U]: V } }> {
    const json = this.json()
    const examples = { ...(json.examples ?? []), [name]: data } as T['examples'] & { [P in U]: V }
    return new Header({ ...json, examples })
  }
}
