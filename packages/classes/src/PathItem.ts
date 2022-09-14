import * as S from '@byu-oit/openapi-schemas'
import { Operation } from './Operation'
import { Server } from './Server'
import { Parameter } from './Parameter'
import { Base } from './Base'
import { Push, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class PathItem<T extends S.PathItem> extends Base implements S.PathItem {
  summary?: string
  description?: string
  servers?: T['servers']
  parameters?: T['parameters']
  get?: T['get']
  put?: T['put']
  post?: T['post']
  delete?: T['delete']
  options?: T['options']
  head?: T['head']
  patch?: T['patch']
  trace?: T['trace']

  constructor (data?: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.PathItem = S.PathItem> (data: unknown): PathItem<T> {
    const valid = PathItem.validator.Check(data)
    if (!valid) throw new TypeCheckError(PathItem.validator, data)
    return new PathItem(data) as PathItem<T>
  }

  static validator = TypeCompiler.Compile(S.TPathItem)

  $summary (summary: string): PathItem<T> {
    return new PathItem({ ...this.json(), summary })
  }

  $description (description: string): PathItem<T> {
    return new PathItem({ ...this.json(), description })
  }

  $server<U extends S.Server> (data: U): PathItem<T & { servers: Push<T['servers'], Server<U>> }> {
    const servers = [...this.servers ?? [], new Server(data)]
    return new PathItem({ ...this.json(), servers })
  }

  $parameter<U extends S.Parameter = S.Parameter>(data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U>> }> {
    const parameters = [...this.parameters ?? [], new Parameter(data)]
    return new PathItem({ ...this.json(), parameters })
  }

  $query<U extends Omit<S.Parameter, 'in'> = Omit<S.Parameter, 'in'>>(data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'query' }>> }> {
    return this.$parameter({ ...data, in: 'query' })
  }

  $header<U extends Omit<S.Parameter, 'in'> = Omit<S.Parameter, 'in'>>(data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'header' }>> }> {
    return this.$parameter({ ...data, in: 'header' })
  }

  $path<U extends Omit<S.Parameter, 'in'> = Omit<S.Parameter, 'in'>>(data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'path' }>> }> {
    return this.$parameter({ ...data, in: 'path' })
  }

  $cookie<U extends Omit<S.Parameter, 'in'> = Omit<S.Parameter, 'in'>>(data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'cookie' }>> }> {
    return this.$parameter({ ...data, in: 'cookie' })
  }

  $operation<U extends S.Method = S.Method, V extends S.Operation = S.Operation>(method: U, data?: V): PathItem<T & { [P in U]: V }> {
    return new PathItem({ ...this.json(), [method]: new Operation(data) })
  }

  $get<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { get: U }> {
    return this.$operation('get', data)
  }

  $put<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { put: U }> {
    return this.$operation('put', data)
  }

  $post<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { post: U }> {
    return this.$operation('post', data)
  }

  $delete<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { delete: U }> {
    return this.$operation('delete', data)
  }

  $options<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { options: U }> {
    return this.$operation('options', data)
  }

  $head<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { head: U }> {
    return this.$operation('head', data)
  }

  $patch<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { patch: U }> {
    return this.$operation('patch', data)
  }

  $trace<U extends S.Operation = S.Operation> (data?: U): PathItem<T & { trace: U }> {
    return this.$operation('trace', data)
  }
}
