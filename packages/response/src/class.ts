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
  description: T['description']
  headers?: HeaderRecord<T['headers']>
  content?: MediaTypeRecord<T['content']>
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

  $description<U extends string> (description: U): Response<T & { description: U }> {
    return new Response({ ...this.json(), description })
  }

  $header<U extends string, V extends HeaderObjectType> (name: U, data: V): Response<T & { headers: T['headers'] & { [P in U]: V } }> {
    const json = this.json()
    const headers = { ...(json.headers ?? []), [name]: data } as T['headers'] & { [P in U]: V }
    return new Response({ ...json, headers })
  }

  $content<U extends string, V extends MediaTypeObjectType> (mimeTypeRange: U, data: V): Response<T & { content: T['content'] & { [P in U]: V } }> {
    const json = this.json()
    const content = { ...(json.content ?? []), [mimeTypeRange]: data } as T['content'] & { [P in U]: V }
    return new Response({ ...json, content })
  }

  $link<U extends string, V extends LinkObjectType> (name: U, data: V): Response<T & { links: T['links'] & { [P in U]: V } }> {
    const json = this.json()
    const links = { ...(json.links ?? []), [name]: data } as T['links'] & { [P in U]: V }
    return new Response({ ...json, links })
  }
}
