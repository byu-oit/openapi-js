import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class Example<T = any> extends Base implements S.Example {
  summary?: string
  description?: string
  value!: T
  externalValue?: string

  constructor (data?: S.Example) {
    super()
    Object.assign(this, data)
  }

  static from (data: unknown): Example {
    const valid = Example.validator.Check(data)
    if (!valid) throw new TypeCheckError(Example.validator, data)
    return new Example(data)
  }

  static validator = TypeCompiler.Compile(S.TExample)

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
