import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { ExampleObjectType, isExampleObject } from './schema'

export class Example<T extends ExampleObjectType> extends BaseObject<T> {
  summary?: T['summary']
  description?: T['description']
  value?: T['value']
  externalValue?: T['externalValue']

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.summary != null) {
      this.summary = data.summary
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.value != null) {
      this.value = data.value
    }

    if (data.externalValue != null) {
      this.externalValue = data.externalValue
    }
  }

  static from<T extends ExampleObjectType = ExampleObjectType> (data: unknown): Example<T> {
    const valid = Example.validator.Check(data)
    if (!valid) throw new TypeCheckError(Example.validator, data)
    return new Example(data) as Example<T>
  }

  static validator = isExampleObject

  $summary<U extends string>(summary: U): Example<T & { summary: U }> {
    return new Example({ ...this.json(), summary })
  }

  $description<U extends string>(description: U): Example<T & { description: U }> {
    return new Example({ ...this.json(), description })
  }

  $value<U>(value: U): Example<T & { value: U }> {
    return new Example({ ...this.json(), value })
  }

  $externalValue<U extends string>(externalValue: U): Example<T & { externalValue: U }> {
    return new Example({ ...this.json(), externalValue })
  }
}
