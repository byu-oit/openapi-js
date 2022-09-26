import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Server, ServerCollection, ServerObjectType } from '@byu-oit/openapi.server'
import {
  isParameterObject,
  Parameter, ParameterCollection,
  ParameterObjectType
} from '@byu-oit/openapi.parameter'
import { Operation, OperationObjectType } from '../Operation'
import { PathItemObjectType, MethodObjectType, isPathItemObject } from './schema'
import { Reference } from '@byu-oit/openapi.reference'

export class PathItem<T extends PathItemObjectType> extends BaseObject<T> {
  /**
   * Source: https://spec.openapis.org/oas/latest.html#path-item-object
   */
  summary?: T['summary']
  description?: T['description']
  servers?: ServerCollection<T['servers']>
  parameters?: ParameterCollection<T['parameters']>
  get?: Operation<NonNullable<T['get']>>
  put?: Operation<NonNullable<T['put']>>
  post?: Operation<NonNullable<T['post']>>
  delete?: Operation<NonNullable<T['delete']>>
  options?: Operation<NonNullable<T['options']>>
  head?: Operation<NonNullable<T['head']>>
  patch?: Operation<NonNullable<T['patch']>>
  trace?: Operation<NonNullable<T['trace']>>

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.summary != null) {
      this.summary = data.summary
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.servers != null) {
      this.servers = data.servers.map(data => new Server(data)) as ServerCollection<T['servers']>
    }

    if (data.parameters != null) {
      this.parameters = data.parameters.map(data => {
        if (isParameterObject.Check(data)) {
          return new Parameter(data)
        }
        return new Reference(data)
      }) as ParameterCollection<T['parameters']>
    }

    if (data.get != null) {
      this.get = new Operation(data.get)
    }

    if (data.put != null) {
      this.put = new Operation(data.put)
    }

    if (data.post != null) {
      this.post = new Operation(data.post)
    }

    if (data.delete != null) {
      this.delete = new Operation(data.delete)
    }

    if (data.options != null) {
      this.options = new Operation(data.options)
    }

    if (data.head != null) {
      this.head = new Operation(data.head)
    }

    if (data.patch != null) {
      this.patch = new Operation(data.patch)
    }

    if (data.trace != null) {
      this.trace = new Operation(data.trace)
    }

  }

  static from<T extends PathItemObjectType = PathItemObjectType> (data: unknown): PathItem<T> {
    const valid = isPathItemObject.Check(data)
    if (!valid) throw new TypeCheckError(isPathItemObject, data)
    return new PathItem(data) as PathItem<T>
  }

  static validator = isPathItemObject

  /**
   * An optional, string summary, intended to apply to all operations in this path.
   *
   * @param {string} summary An optional, string summary, intended to apply to all operations in this path.
   * @returns Returns a new PathItem instance with the given summary text.
   */
  $summary (summary: string): PathItem<T> {
    return new PathItem({ ...this.json(), summary })
  }

  $description (description: string): PathItem<T> {
    return new PathItem({ ...this.json(), description })
  }

  $server<U extends ServerObjectType> (data: U): PathItem<T & { servers: [...NonNullable<T['servers']>, U] }> {
    const json = this.json()
    const servers = [...(json.servers ?? []) ?? [], data]  as [...NonNullable<T['servers']>, U]
    return new PathItem({ ...json, servers })
  }

  $parameter<U extends ParameterObjectType = ParameterObjectType> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U] }> {
    const json = this.json()
    const parameters = [...(json.parameters ?? []) ?? [], data] as [...NonNullable<T['parameters']>, U]
    return new PathItem({ ...json, parameters })
  }

  $query<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'query' }] }> {
    return this.$parameter({ ...data, in: 'query' })
  }

  $header<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'header' }] }> {
    return this.$parameter({ ...data, in: 'header' })
  }

  $path<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'path' }] }> {
    return this.$parameter({ ...data, in: 'path' })
  }

  $cookie<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'cookie' }] }> {
    return this.$parameter({ ...data, in: 'cookie' })
  }

  $operation<U extends MethodObjectType = MethodObjectType, V extends OperationObjectType = OperationObjectType> (method: U, data?: V): PathItem<T & { [P in U]: V }> {
    const pathItem = { ...this.json(), [method]: data } as T & { [P in U]: V }
    return new PathItem(pathItem)
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
