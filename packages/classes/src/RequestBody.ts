import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { MediaType } from './MediaType'
import { Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class RequestBody<T extends S.RequestBody> extends Base implements S.RequestBody {
  description?: string
  content!: T['content']
  required?: T['required']

  constructor (data: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.RequestBody = S.RequestBody> (data: unknown): RequestBody<T> {
    const valid = RequestBody.validator.Check(data)
    if (!valid) throw new TypeCheckError(RequestBody.validator, data)
    return new RequestBody(data) as RequestBody<T>
  }

  static validator = TypeCompiler.Compile(S.TRequestBody)

  $description (description: string): RequestBody<T> {
    return new RequestBody({ ...this.json(), description })
  }

  $content<U extends string, V extends S.MediaType>(mimeType: U, data: V): RequestBody<T & { content: Merge<T['content'], { [P in U]: MediaType<V> }> }> {
    return new RequestBody({
      ...this.json(),
      content: {
        ...this.content,
        [mimeType]: new MediaType(data)
      }
    })
  }

  $json<U extends S.MediaType> (data: U): RequestBody<T & { content: Merge<T['content'], { ['application/json']: MediaType<U> }> }> {
    return this.$content<'application/json', U>('application/json', data)
  }

  $required<U extends boolean> (required: U): RequestBody<T & { required: U }> {
    return new RequestBody({ ...this.json(), required })
  }
}
