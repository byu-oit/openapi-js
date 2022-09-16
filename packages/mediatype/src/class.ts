import { Base, isTSchema, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { Example } from '@byu-oit/openapi.example'
import { Encoding, EncodingObjectType } from '@byu-oit/openapi.encoding'
import { TSchema } from '@sinclair/typebox'
import { isMediaTypeObject, MediaTypeObjectType } from './schema'

export class MediaType<T extends MediaTypeObjectType> extends Base implements MediaTypeObjectType {
  schema?: T['schema']
  example?: any
  examples?: Record<string, Example>
  encoding?: T['encoding']

  constructor (data?: T)
  constructor (schema: T['schema'], data?: T)
  constructor (schema?: T['schema'] | T, data?: T) {
    super()
    const mediaType = schema == null && !isTSchema(schema) ? { ...data, schema } : schema
    Object.assign(this, mediaType)
  }

  static from<T extends MediaTypeObjectType>(data: unknown): MediaType<T> {
    const valid = MediaType.validator.Check(data)
    if(!valid) throw new TypeCheckError(MediaType.validator, data)
    return new MediaType(data) as MediaType<T>
  }

  static validator = isMediaTypeObject

  $schema<U extends TSchema = TSchema> (schema: U): MediaType<T & { schema: U }> {
    return new MediaType({ ...this.json(), schema })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): MediaType<T> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new MediaType({ ...this.json(), examples })
  }

  $encoding<
    U extends string,
    V extends EncodingObjectType
  > (name: U, data: V): MediaType<T & { encoding: Merge<T['encoding'], { [P in U]: Encoding<V> }> }> {
    const encoding = { ...this.encoding, [name]: new Encoding(data) }
    return new MediaType({ ...this.json(), encoding })
  }
}
