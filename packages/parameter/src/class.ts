import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Example, ExampleObjectType, ExampleRecord } from '@byu-oit/openapi.example'
import {
  ParameterObjectType,
  ParameterLocationType,
  ParameterStyleType,
  isParameterObject
} from './schema'
import { isReferenceObject, Reference } from '@byu-oit/openapi.reference'

export class Parameter<T extends ParameterObjectType> extends BaseObject<T> {
  name: T['name']
  in: T['in']
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

  constructor (data: T) {
    super()

    this.name = data.name

    this.in = data.in

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

  static from<T extends ParameterObjectType = ParameterObjectType> (data: unknown): Parameter<T> {
    const valid = Parameter.validator.Check(data)
    if (!valid) throw new TypeCheckError(Parameter.validator, data)
    return new Parameter(data) as Parameter<T>
  }

  static validator = isParameterObject

  static query<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'query' }> {
    return new Parameter<T & { in: 'query' }>({ ...data, in: 'query' })
  }

  static header<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'header' }> {
    return new Parameter({ ...data, in: 'header' })
  }

  static path<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'path' }> {
    return new Parameter({ ...data, in: 'path' })
  }

  static cookie<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'cookie' }> {
    return new Parameter({ ...data, in: 'cookie' })
  }

  $name<U extends string = string> (name: U): Parameter<T & { name: U }> {
    return new Parameter<T & { name: U }>({ ...this.json(), name })
  }

  $in<L extends ParameterLocationType = ParameterLocationType> (location: L): Parameter<T & { in: L }> {
    return new Parameter({ ...this.json(), in: location })
  }

  $description (description: string): Parameter<T> {
    return new Parameter({ ...this.json(), description })
  }

  $required<U extends boolean = boolean> (required: U): Parameter<T & { required: U }> {
    return new Parameter({ ...this.json(), required })
  }

  $deprecated<U extends boolean = boolean> (deprecated: U): Parameter<T & { deprecated: U }> {
    return new Parameter({ ...this.json(), deprecated })
  }

  $allowEmptyValue<U extends boolean = boolean> (allowEmptyValue: U): Parameter<T & { allowEmptyValue: U }> {
    return new Parameter({ ...this.json(), allowEmptyValue })
  }

  $style<U extends ParameterStyleType = ParameterStyleType> (style: U): Parameter<T & { style: U }> {
    return new Parameter({ ...this.json(), style })
  }

  $explode<U extends boolean = boolean> (explode: U): Parameter<T & { explode: U }> {
    return new Parameter({ ...this.json(), explode })
  }

  $allowReserved<U extends boolean = boolean> (allowReserved: U): Parameter<T & { allowReserved: U }> {
    return new Parameter({ ...this.json(), allowReserved })
  }

  $example<U extends string, V extends ExampleObjectType>(name: U, data?: V): Parameter<T & { examples: T['examples'] & { [P in U]: V } }> {
    const json = this.json()
    const examples = { ...(json.examples ?? []), [name]: data } as T['examples'] & { [P in U]: V }
    return new Parameter({ ...json, examples })
  }
}
