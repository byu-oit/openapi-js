import { Base, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { MediaType, MediaTypeObjectType } from '@byu-oit/openapi.mediatype'
import { isRequestBodyObject, RequestBodyObjectType } from './schema'

export class RequestBody<T extends RequestBodyObjectType> extends Base implements RequestBodyObjectType {
  description?: string
  content!: T['content']
  required?: T['required']

  constructor (data: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends RequestBodyObjectType = RequestBodyObjectType> (data: unknown): RequestBody<T> {
    const valid = RequestBody.validator.Check(data)
    if (!valid) throw new TypeCheckError(RequestBody.validator, data)
    return new RequestBody(data) as RequestBody<T>
  }

  static validator = isRequestBodyObject

  $description (description: string): RequestBody<T> {
    return new RequestBody({ ...this.json(), description })
  }

  $content<U extends string, V extends MediaTypeObjectType>(mimeType: U, data: V): RequestBody<T & { content: Merge<T['content'], { [P in U]: MediaType<V> }> }> {
    return new RequestBody({
      ...this.json(),
      content: {
        ...this.content,
        [mimeType]: new MediaType(data)
      }
    })
  }

  $json<U extends MediaTypeObjectType> (data: U): RequestBody<T & { content: Merge<T['content'], { ['application/json']: MediaType<U> }> }> {
    return this.$content<'application/json', U>('application/json', data)
  }

  $required<U extends boolean> (required: U): RequestBody<T & { required: U }> {
    return new RequestBody({ ...this.json(), required })
  }
}
