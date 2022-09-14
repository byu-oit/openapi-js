import { TypeCheck } from '@sinclair/typebox/compiler/compiler'
import { ValueError } from '@sinclair/typebox/errors'

export class TypeCheckError extends Error {
  details: ValueError[]
  constructor (compiled: TypeCheck<any>, value: unknown, message?: string) {
    super(message ?? 'Validation error encountered')
    this.details = [...compiled.Errors(value)]
  }
}
