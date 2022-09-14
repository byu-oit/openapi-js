import * as S from '@byu-oit/openapi-schemas'
import { TSchema } from '@sinclair/typebox'
import { Example } from './Example'
import { Encoding } from './Encoding'
import { Base } from './Base'
import { isTSchema, Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class MediaType<T extends S.MediaType> extends Base implements S.MediaType {
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

  static from<T extends S.MediaType>(data: unknown): MediaType<T> {
    const valid = MediaType.validator.Check(data)
    if(!valid) throw new TypeCheckError(MediaType.validator, data)
    return new MediaType(data) as MediaType<T>
  }

  static validator = TypeCompiler.Compile(S.TMediaType)

  $schema<U extends TSchema = TSchema> (schema: U): MediaType<T & { schema: U }> {
    return new MediaType({ ...this.json(), schema })
  }

  $example (name: string, ...args: ConstructorParameters<typeof Example>): MediaType<T> {
    const examples = { ...this.examples, [name]: new Example(...args) }
    return new MediaType({ ...this.json(), examples })
  }

  $encoding<
    U extends string,
    V extends S.Encoding
  > (name: U, data: V): MediaType<T & { encoding: Merge<T['encoding'], { [P in U]: Encoding<V> }> }> {
    const encoding = { ...this.encoding, [name]: new Encoding(data) }
    return new MediaType({ ...this.json(), encoding })
  }
}
