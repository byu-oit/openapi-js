import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  MediaType,
  MediaTypeObjectType,
  MediaTypeRecord
} from '@byu-oit/openapi.mediatype'
import { isRequestBodyObject, RequestBodyObjectType } from './schema'

export class RequestBody<T extends RequestBodyObjectType> extends BaseObject<T> {
  /**
   * A brief description of the request body. This could contain examples of use.
   * CommonMark syntax MAY be used for rich text representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#request-body-object RequestBody
   * Object}
   */
  description?: T['description']

  /**
   * REQUIRED. The content of the request body. The key is a media type or media type
   * range and the value describes it. For requests that match multiple keys, only the
   * most specific key is applicable. e.g. text/plain overrides text/*
   *
   * {@link https://spec.openapis.org/oas/latest.html#request-body-object RequestBody
   * Object}
   */
  content: MediaTypeRecord<T['content']>

  /**
   * Determines if the request body is required in the request. Defaults to false.
   *
   * {@link https://spec.openapis.org/oas/latest.html#request-body-object RequestBody
   * Object}
   */
  required?: T['required']

  constructor (data: T) {
    super()

    this.content = Object.entries(data.content).reduce((agg, [basename, data]) => {
      return { ...agg, [basename]: new MediaType(data) }
    }, {} as MediaTypeRecord<T['content']>)

    if (data.description != null) {
      this.description = data.description
    }

    if (data.required != null) {
      this.required = data.required
    }
  }

  static from<T extends RequestBodyObjectType = RequestBodyObjectType> (data: unknown): RequestBody<T> {
    const valid = RequestBody.validator.Check(data)
    if (!valid) throw new TypeCheckError(RequestBody.validator, data)
    return new RequestBody(data) as RequestBody<T>
  }

  static validator = isRequestBodyObject

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {RequestBody<T & { description: U }>}
   */
  $description<U extends string> (description: U): RequestBody<T & { description: U }> {
    return new RequestBody({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the content added.
   *
   * @template T, U, V, P
   * @param {U} mimeType
   * @param {V} data
   * @returns {RequestBody<T & { content: T['content'] & { [P in U]: V } }>}
   */
  $content<U extends string, V extends MediaTypeObjectType> (mimeType: U, data: V): RequestBody<T & { content: T['content'] & { [P in U]: V } }> {
    const json = this.json()
    const content = {
      ...(json.content ?? []),
      [mimeType]: data
    } as T['content'] & { [P in U]: V }
    return new RequestBody({ ...json, content })
  }

  /**
   * Creates a copy of the instance with the json added.
   *
   * @template T, U
   * @param {U} data
   * @returns {RequestBody<T & { content: T['content'] & { ['application/json']: U } }>}
   */
  $json<U extends MediaTypeObjectType> (data: U): RequestBody<T & { content: T['content'] & { ['application/json']: U } }> {
    return this.$content<'application/json', U>('application/json', data)
  }

  /**
   * Creates a copy of the instance with the required added.
   *
   * @template T, U
   * @param {U} required
   * @returns {RequestBody<T & { required: U }>}
   */
  $required<U extends boolean> (required: U): RequestBody<T & { required: U }> {
    return new RequestBody({ ...this.json(), required })
  }
}
