import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  MediaType,
  MediaTypeObjectType,
  MediaTypeRecord
} from '@byu-oit/openapi.mediatype'
import { isRequestBodyObject, RequestBodyObjectType } from './schema'

export class RequestBody<T extends RequestBodyObjectType> extends BaseObject<T> {
  description?: T['description']
  content: MediaTypeRecord<T['content']>
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

  $description<U extends string>(description: U): RequestBody<T & { description: U }> {
    return new RequestBody({ ...this.json(), description })
  }

  $content<U extends string, V extends MediaTypeObjectType>(mimeType: U, data: V): RequestBody<T & { content: T['content'] & { [P in U]: V } }> {
    const json = this.json()
    const content = { ...(json.content ?? []), [mimeType]: data } as T['content'] & { [P in U]: V }
    return new RequestBody({ ...json, content })
  }

  $json<U extends MediaTypeObjectType> (data: U): RequestBody<T & { content: T['content'] & { ['application/json']: U } }> {
    return this.$content<'application/json', U>('application/json', data)
  }

  $required<U extends boolean> (required: U): RequestBody<T & { required: U }> {
    return new RequestBody({ ...this.json(), required })
  }
}
