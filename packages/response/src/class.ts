import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Link, LinkObjectType, LinkRecord } from '@byu-oit/openapi.link'
import { Header, HeaderObjectType, HeaderRecord } from '@byu-oit/openapi.header'
import {
  MediaType,
  MediaTypeObjectType,
  MediaTypeRecord
} from '@byu-oit/openapi.mediatype'
import { isResponseObject, ResponseObjectType } from './schema'
import { isReferenceObject, Reference } from '@byu-oit/openapi.reference'

export class Response<T extends ResponseObjectType> extends BaseObject<T> {
  /**
   * REQUIRED. A description of the response. CommonMark syntax MAY be used for rich
   * text representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#response-object Response Object}
   */
  description: T['description']

  /**
   * Maps a header name to its definition. [RFC7230] states header names are case
   * insensitive. If a response header is defined with the name "Content-Type", it
   * SHALL be ignored.
   *
   * {@link https://spec.openapis.org/oas/latest.html#response-object Response Object}
   */
  headers?: HeaderRecord<T['headers']>

  /**
   * A map containing descriptions of potential response payloads. The key is a media
   * type or media type range and the value describes it. For responses that match
   * multiple keys, only the most specific key is applicable. e.g. text/plain
   * overrides text/*
   *
   * {@link https://spec.openapis.org/oas/latest.html#response-object Response Object}
   */
  content?: MediaTypeRecord<T['content']>

  /**
   * A map of operations links that can be followed from the response. The key of the
   * map is a short name for the link, following the naming constraints of the names
   * for Component Objects.
   *
   * {@link https://spec.openapis.org/oas/latest.html#response-object Response Object}
   */
  links?: LinkRecord<T['links']>

  constructor (data: T) {
    super()

    this.description = data.description

    if (data.headers != null) {
      this.headers = Object.entries(data.headers).reduce((agg, [basename, data]) => {
        const header = isReferenceObject.Check(data) ? new Reference(data) : new Header(data)
        return { ...agg, [basename]: header }
      }, {} as HeaderRecord<T['headers']>)
    }

    if (data.content != null) {
      this.content = Object.entries(data.content).reduce((agg, [basename, data]) => {
        return { ...agg, [basename]: new MediaType(data) }
      }, {} as MediaTypeRecord<T['content']>)
    }

    if (data.links != null) {
      this.links = Object.entries(data.links).reduce((agg, [basename, data]) => {
        const link = isReferenceObject.Check(data) ? new Reference(data) : new Link(data)
        return { ...agg, [basename]: link }
      }, {} as LinkRecord<T['links']>)
    }
  }

  static from<T extends ResponseObjectType = ResponseObjectType> (data: unknown): Response<T> {
    const valid = Response.validator.Check(data)
    if (!valid) throw new TypeCheckError(Response.validator, data)
    return new Response(data) as Response<T>
  }

  static validator = isResponseObject

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {Response<T & { description: U }>}
   */
  $description<U extends string> (description: U): Response<T & { description: U }> {
    return new Response({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the header added.
   *
   * @template T, U, V, P
   * @param {U} name
   * @param {V} data
   * @returns {Response<T & { headers: T['headers'] & { [P in U]: V } }>}
   */
  $header<U extends string, V extends HeaderObjectType> (name: U, data: V): Response<T & { headers: T['headers'] & { [P in U]: V } }> {
    const json = this.json()
    const headers = { ...(json.headers ?? []), [name]: data } as T['headers'] & { [P in U]: V }
    return new Response({ ...json, headers })
  }

  /**
   * Creates a copy of the instance with the content added.
   *
   * @template T, U, V, P
   * @param {U} mimeTypeRange
   * @param {V} data
   * @returns {Response<T & { content: T['content'] & { [P in U]: V } }>}
   */
  $content<U extends string, V extends MediaTypeObjectType> (mimeTypeRange: U, data: V): Response<T & { content: T['content'] & { [P in U]: V } }> {
    const json = this.json()
    const content = { ...(json.content ?? []), [mimeTypeRange]: data } as T['content'] & { [P in U]: V }
    return new Response({ ...json, content })
  }

  /**
   * Creates a copy of the instance with the link added.
   *
   * @template T, U, V, P
   * @param {U} name
   * @param {V} data
   * @returns {Response<T & { links: T['links'] & { [P in U]: V } }>}
   */
  $link<U extends string, V extends LinkObjectType> (name: U, data: V): Response<T & { links: T['links'] & { [P in U]: V } }> {
    const json = this.json()
    const links = { ...(json.links ?? []), [name]: data } as T['links'] & { [P in U]: V }
    return new Response({ ...json, links })
  }
}
