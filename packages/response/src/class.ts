import { Base, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { Link, LinkObjectType } from '@byu-oit/openapi.link'
import { Header, HeaderObjectType } from '@byu-oit/openapi.header'
import { MediaType, MediaTypeObjectType } from '@byu-oit/openapi.mediatype'
import { isResponseObject, ResponseObjectType } from './schema'

export class Response<T extends ResponseObjectType> extends Base implements ResponseObjectType {
  description!: string
  headers?: T['headers']
  content?: T['content']
  links?: T['links']

  constructor (data: T)
  constructor (description: string, data: Omit<T, 'description'>)
  constructor (description: string | T, data?: Omit<T, 'description'>) {
    super()
    const response = typeof description === 'string'
      ? { ...data, description }
      : description
    Object.assign(this, response)
  }

  static from<T extends ResponseObjectType = ResponseObjectType> (data: unknown): Response<T> {
    const valid = Response.validator.Check(data)
    if (!valid) throw new TypeCheckError(Response.validator, data)
    return new Response(data) as Response<T>
  }

  static validator = isResponseObject

  $description (description: string): Response<T> {
    return new Response({ ...this.json(), description })
  }

  $header<U extends string, V extends HeaderObjectType> (name: U, data: V): Response<T & { headers: Merge<T['headers'], { [P in U]: Header<V> }> }> {
    const headers = { ...this.headers, [name]: new Header(data) }
    return new Response({ ...this.json(), headers })
  }

  $content<U extends string, V extends MediaTypeObjectType>(mimeTypeRange: U, data: V): Response<T & { content: Merge<T['content'], { [mimeTypeRange in U]: MediaType<V> }>}> {
    const content = { ...this.content, [mimeTypeRange]: new MediaType(data) }
    return new Response({ ...this.json(), content })
  }

  $link<U extends string, V extends LinkObjectType> (name: U, data: V): Response<T & { links: Merge<T['links'], { [P in U]: V }> }> {
    const links = { ...this.links, [name]: new Link(data) }
    return new Response({ ...this.json(), links })
  }
}
