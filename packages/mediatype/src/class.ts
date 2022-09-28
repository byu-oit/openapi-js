import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Encoding, EncodingObjectType, EncodingRecord } from '@byu-oit/openapi.encoding'
import { Example, ExampleObjectType, ExampleRecord } from '@byu-oit/openapi.example'
import { TSchema } from '@sinclair/typebox'
import { isMediaTypeObject, MediaTypeObjectType } from './schema'

/**
 * Each Media Type Object provides schema and examples for the media type identified by its key.
 * 
 * Source: https://spec.openapis.org/oas/latest#media-type-object
 */
export class MediaType<T extends MediaTypeObjectType> extends BaseObject<T> {

  /**
   * The schema defining the content of the request, response, or parameter.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-11
   */
  schema?: T['schema']

  /**
   * Example of the media type. The example object SHOULD be in the correct format as specified by the media type. The example field is mutually exclusive of the examples field. 
   * Furthermore, if referencing a schema which contains an example, the example value SHALL override the example provided by the schema.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-11
   */
  example?: T['example']

  /**
   * Examples of the media type. Each example object SHOULD match the media type and specified schema if present. The examples field is mutually exclusive of the example field. 
   * Furthermore, if referencing a schema which contains an example, the examples value SHALL override the example provided by the schema.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-11
   */
  examples?: ExampleRecord<T['examples']>

  /**
   * A map between a property name and its encoding information. The key, being the property name, MUST exist in the schema as a property. 
   * The encoding object SHALL only apply to requestBody objects when the media type is multipart or application/x-www-form-urlencoded.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-11
   */
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

  /**
   * Creates a copy of the instance with the schema property added.
   * 
   * @template T,U
   * @param {U} schema The schema to be added to the MediaType object.
   * @returns {MediaType<T & { schema: U }>}
   */
  $schema<U extends TSchema = TSchema> (schema: U): MediaType<T & { schema: U }> {
    return new MediaType({ ...this.json(), schema })
  }

  /**
   * Creates a copy of the instance with the example property added.
   * 
   * @template T, U, V, P
   * @param {U} name The name to be added to the MediaType object.
   * @param {V} data The data to be added to the MediaType object
   * @returns {MediaType<T & { examples: T['examples'] & { [P in U]: V } }>}
   */
  $example<U extends string, V extends ExampleObjectType>(name: U, data?: V): MediaType<T & { examples: T['examples'] & { [P in U]: V } }> {
    const json = this.json()
    const examples = { ...(json.examples ?? []), [name]: data } as T['examples'] & { [P in U]: V }
    return new MediaType({ ...json, examples })
  }

  /**
   * Creates a copy of the instance with the encoding property added.
   * 
   * @template T, U, V, P
   * @param {U} name The name to be added to the MediaType object.
   * @param {V} data The data to be added to the MediaType object.
   * @returns {MediaType<T & { encoding: T['encoding'] & { [P in U]: V } }>}
   */
  $encoding<U extends string, V extends EncodingObjectType> (name: U, data: V): MediaType<T & { encoding: T['encoding'] & { [P in U]: V } }> {
    const json = this.json()
    const encoding = { ...(json.encoding ?? []), [name]: data } as T['encoding'] & { [P in U]: V }
    return new MediaType({ ...json, encoding })
  }
}
