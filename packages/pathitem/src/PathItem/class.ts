import { Base, Push, TypeCheckError } from '@byu-oit/openapi.common'
import { Server, ServerObjectType } from '@byu-oit/openapi.server'
import { Parameter, ParameterObjectType } from '@byu-oit/openapi.parameter'
import { Operation, OperationObjectType } from '../Operation'
import { PathItemObjectType, MethodObjectType, isPathItemObject } from './schema'

export class PathItem<T extends PathItemObjectType> extends Base implements PathItemObjectType {
  summary?: T['summary']
  description?: T['description']
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

  static from<T extends PathItemObjectType = PathItemObjectType> (data: unknown): PathItem<T> {
    const valid = isPathItemObject.Check(data)
    if (!valid) throw new TypeCheckError(isPathItemObject, data)
    return new PathItem(data) as PathItem<T>
  }

  static validator = isPathItemObject

  $summary (summary: string): PathItem<T> {
    return new PathItem({ ...this.json(), summary })
  }

  $description (description: string): PathItem<T> {
    return new PathItem({ ...this.json(), description })
  }

  $server<U extends ServerObjectType> (data: U): PathItem<T & { servers: Push<T['servers'], Server<U>> }> {
    const servers = [...this.servers ?? [], new Server(data)]
    return new PathItem({ ...this.json(), servers })
  }

  $parameter<U extends ParameterObjectType = ParameterObjectType> (data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U>> }> {
    const parameters = [...this.parameters ?? [], new Parameter(data)]
    return new PathItem({ ...this.json(), parameters })
  }

  $query<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'query' }>> }> {
    return this.$parameter({ ...data, in: 'query' })
  }

  $header<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'header' }>> }> {
    return this.$parameter({ ...data, in: 'header' })
  }

  $path<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'path' }>> }> {
    return this.$parameter({ ...data, in: 'path' })
  }

  $cookie<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: Push<T['parameters'], Parameter<U & { in: 'cookie' }>> }> {
    return this.$parameter({ ...data, in: 'cookie' })
  }

  $operation<U extends MethodObjectType = MethodObjectType, V extends OperationObjectType = OperationObjectType> (method: U, data?: V): PathItem<T & { [P in U]: V }> {
    return new PathItem({ ...this.json(), [method]: new Operation(data) })
  }

  $get<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { get: U }> {
    return this.$operation('get', data)
  }

  $put<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { put: U }> {
    return this.$operation('put', data)
  }

  $post<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { post: U }> {
    return this.$operation('post', data)
  }

  $delete<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { delete: U }> {
    return this.$operation('delete', data)
  }

  $options<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { options: U }> {
    return this.$operation('options', data)
  }

  $head<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { head: U }> {
    return this.$operation('head', data)
  }

  $patch<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { patch: U }> {
    return this.$operation('patch', data)
  }

  $trace<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { trace: U }> {
    return this.$operation('trace', data)
  }
}
