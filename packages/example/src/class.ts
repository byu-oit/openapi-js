import { Base, TypeCheckError } from '@byu-oit/openapi.common'
import { ExampleObjectType, isExampleObject } from './schema'

export class Example<T = any> extends Base implements ExampleObjectType {
  summary?: string
  description?: string
  value!: T
  externalValue?: string

  constructor (data?: ExampleObjectType) {
    super()
    Object.assign(this, data)
  }

  static from (data: unknown): Example {
    const valid = Example.validator.Check(data)
    if (!valid) throw new TypeCheckError(Example.validator, data)
    return new Example(data)
  }

  static validator = isExampleObject

  $summary (summary: string): Example {
    return new Example({ ...this.json(), summary })
  }

  $description (description: string): Example {
    return new Example({ ...this.json(), description })
  }

  $value<T = any>(value: T): Example<T> {
    return new Example({ ...this.json(), value })
  }

  $externalValue (externalValue: string): Example {
    return new Example({ ...this.json(), externalValue })
  }
}
