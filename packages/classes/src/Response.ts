import * as S from '@byu-oit/openapi-schemas'
import { Link } from './Link'
import { Header } from './Header'
import { MediaType } from './MediaType'
import { Base } from './Base'
import { Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class Response<T extends S.Response> extends Base implements S.Response {
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

  static from<T extends S.Response = S.Response> (data: unknown): Response<T> {
    const valid = Response.validator.Check(data)
    if (!valid) throw new TypeCheckError(Response.validator, data)
    return new Response(data) as Response<T>
  }

  static validator = TypeCompiler.Compile(S.TResponse)

  $description (description: string): Response<T> {
    return new Response({ ...this.json(), description })
  }

  $header<U extends string, V extends S.Header> (name: U, data: V): Response<T & { headers: Merge<T['headers'], { [P in U]: Header<V> }> }> {
    const headers = { ...this.headers, [name]: new Header(data) }
    return new Response({ ...this.json(), headers })
  }

  $content<U extends string, V extends S.MediaType>(mimeTypeRange: U, data: V): Response<T & { content: Merge<T['content'], { [mimeTypeRange in U]: MediaType<V> }>}> {
    const content = { ...this.content, [mimeTypeRange]: new MediaType(data) }
    return new Response({ ...this.json(), content })
  }

  $link<U extends string, V extends S.Link> (name: U, data: V): Response<T & { links: Merge<T['links'], { [P in U]: V }> }> {
    const links = { ...this.links, [name]: new Link(data) }
    return new Response({ ...this.json(), links })
  }
}
