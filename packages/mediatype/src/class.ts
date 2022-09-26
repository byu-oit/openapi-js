import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Encoding, EncodingObjectType, EncodingRecord } from '@byu-oit/openapi.encoding'
import { Example, ExampleObjectType, ExampleRecord } from '@byu-oit/openapi.example'
import { TSchema } from '@sinclair/typebox'
import { isMediaTypeObject, MediaTypeObjectType } from './schema'

export class MediaType<T extends MediaTypeObjectType> extends BaseObject<T> {
  schema?: T['schema']
  example?: T['example']
  examples?: ExampleRecord<T['examples']>
  encoding?: EncodingRecord<T['encoding']>

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.schema != null) {
      this.schema = data.schema
    }

    if (data.example != null) {
      this.example = data.example
    }

    if (data.examples != null) {
      this.examples = Object.entries(data.examples).reduce((agg, [basename, data]) => {
        const example = new Example(data)
        return { ...agg, [basename]: example }
      }, {} as ExampleRecord<T['examples']>)
    }

    if (data.encoding != null) {
      this.encoding = Object.entries(data.encoding).reduce((agg, [basename, data]) => {
        const encoding = new Encoding(data)
        return { ...agg, [basename]: encoding }
      }, {} as EncodingRecord<T['encoding']>)
    }
  }

  static from<T extends MediaTypeObjectType> (data: unknown): MediaType<T> {
    const valid = MediaType.validator.Check(data)
    if (!valid) throw new TypeCheckError(MediaType.validator, data)
    return new MediaType(data) as MediaType<T>
  }

  static validator = isMediaTypeObject

  $schema<U extends TSchema = TSchema> (schema: U): MediaType<T & { schema: U }> {
    return new MediaType({ ...this.json(), schema })
  }

  $example<U extends string, V extends ExampleObjectType>(name: U, data?: V): MediaType<T & { examples: T['examples'] & { [P in U]: V } }> {
    const json = this.json()
    const examples = { ...(json.examples ?? []), [name]: data } as T['examples'] & { [P in U]: V }
    return new MediaType({ ...json, examples })
  }

  $encoding<U extends string, V extends EncodingObjectType> (name: U, data: V): MediaType<T & { encoding: T['encoding'] & { [P in U]: V } }> {
    const json = this.json()
    const encoding = { ...(json.encoding ?? []), [name]: data } as T['encoding'] & { [P in U]: V }
    return new MediaType({ ...json, encoding })
  }
}
