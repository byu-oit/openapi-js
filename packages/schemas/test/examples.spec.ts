import { getSchemas, Validator, AjvError } from '../src'
import { TSchema } from '@sinclair/typebox'

const schemas: Array<[string, TSchema]> = getSchemas().map((schema, i) => [schema.$id ?? `unknown schema at index [${i}]`, schema])

describe.each(schemas)('%s validates all its examples', (id, schema) => {
  let validator: Validator
  if (!Array.isArray(schema.examples)) {
    throw TypeError(`The schema ${id} expects an array of examples to validate the schema against but none were found`)
  }

  beforeAll(() => {
    validator = new Validator(schema)
  })

  const examples: Array<[number, any]> = schema.examples.map((example, i) => [i, example])
  test.concurrent.each(examples)('Validates example %i', (i, example) => {
    expect(() => validator.parse(example)).not.toThrow(AjvError)
  })
})
