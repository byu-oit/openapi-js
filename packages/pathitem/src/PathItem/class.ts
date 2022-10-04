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
   * An optional, string summary, intended to apply to all operations in this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  summary?: T['summary']

  /**
   * An optional, string description, intended to apply to all operations in this
   * path. {@link https://spec.commonmark.org/ CommonMark syntax} MAY be used for rich
   * text representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  description?: T['description']

  /**
   * An alternative server array to service all operations in this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  servers?: ServerCollection<T['servers']>

  /**
   * A list of parameters that are applicable for this operation. If a parameter is
   * already defined at the {@link https://spec.openapis.org/oas/latest.html#pathItemParameters Path Item}, the new definition will override it but can
   * never remove it. The list MUST NOT include duplicated parameters. A unique
   * parameter is defined by a combination of a {@link https://spec.openapis.org/oas/latest.html#parameterName name} and {@link https://spec.openapis.org/oas/latest.html#parameterIn location}. The list
   * can use the {@link https://spec.openapis.org/oas/latest.html#referenceObject
   * Reference Object} to link to  parameters that are defined at the
   * {@link https://spec.openapis.org/oas/latest.html#componentsParameters OpenAPI
   * Object’s components/parameters}.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  parameters?: ParameterCollection<T['parameters']>

  /**
   * A definition of a GET operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  get?: Operation<NonNullable<T['get']>>

  /**
   * A definition of a PUT operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  put?: Operation<NonNullable<T['put']>>

  /**
   * A definition of a POST operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  post?: Operation<NonNullable<T['post']>>

  /**
   * A definition of a DELETE operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  delete?: Operation<NonNullable<T['delete']>>

  /**
   * A definition of a OPTIONS operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  options?: Operation<NonNullable<T['options']>>

  /**
   * A definition of a HEAD operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  head?: Operation<NonNullable<T['head']>>

  /**
   * A definition of a PATCH operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
  patch?: Operation<NonNullable<T['patch']>>

  /**
   * A definition of a TRACE operation on this path.
   *
   * {@link https://spec.openapis.org/oas/latest.html#path-item-object PathItem Object}
   */
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
   * Creates a copy of the instance with the summary added.
   *
   * @template T
   * @param {string} summary An optional, string summary, intended to apply to all operations in this path.
   * @returns {PathItem<T>}
   */
  $summary (summary: string): PathItem<T> {
    return new PathItem({ ...this.json(), summary })
  }

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {string} description
   * @returns {PathItem<T>}
   */
  $description (description: string): PathItem<T> {
    return new PathItem({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the server added.
   *
   * @template T, U
   * @param {U} data
   * @returns {PathItem<T & { servers: [...NonNullable<T['servers']>, U] }>}
   */
  $server<U extends ServerObjectType> (data: U): PathItem<T & { servers: [...NonNullable<T['servers']>, U] }> {
    const json = this.json()
    const servers = [...(json.servers ?? []) ?? [], data] as [...NonNullable<T['servers']>, U]
    return new PathItem({ ...json, servers })
  }

  /**
   * Creates a copy of the instance with the parameter added.
   *
   * @template T, U
   * @param {U} data
   * @returns {PathItem<T & { parameters: [...NonNullable<T['parameters']>, U] }>}
   */
  $parameter<U extends ParameterObjectType = ParameterObjectType> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U] }> {
    const json = this.json()
    const parameters = [...(json.parameters ?? []) ?? [], data] as [...NonNullable<T['parameters']>, U]
    return new PathItem({ ...json, parameters })
  }

  /**
   * Creates a copy of the instance with the query added.
   *
   * @template T, U
   * @param {U} data
   * @returns {PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'query' }] }>}
   */
  $query<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'query' }] }> {
    return this.$parameter({ ...data, in: 'query' })
  }

  /**
   * Creates a copy of the instance with the header added.
   *
   * @template T, U
   * @param {U} data
   * @returns {PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'header' }] }>}
   */
  $header<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'header' }] }> {
    return this.$parameter({ ...data, in: 'header' })
  }

  /**
   * Creates a copy of the instance with the path added.
   *
   * @template T, U
   * @param {U} data
   * @returns {PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'path' }] }>}
   */
  $path<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'path' }] }> {
    return this.$parameter({ ...data, in: 'path' })
  }

  /**
   * Creates a copy of the instance with the cookie added.
   *
   * @template T, U
   * @param {U} data
   * @returns {PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'cookie' }] }>}
   */
  $cookie<U extends Omit<ParameterObjectType, 'in'> = Omit<ParameterObjectType, 'in'>> (data: U): PathItem<T & { parameters: [...NonNullable<T['parameters']>, U & { in: 'cookie' }] }> {
    return this.$parameter({ ...data, in: 'cookie' })
  }

  /**
   * Creates a copy of the instance with the operation added.
   *
   * @template T, U, V, P
   * @param {U} method
   * @param {V} data
   * @returns {PathItem<T & { [P in U]: V }>}
   */
  $operation<U extends MethodObjectType = MethodObjectType, V extends OperationObjectType = OperationObjectType> (method: U, data?: V): PathItem<T & { [P in U]: V }> {
    const pathItem = { ...this.json(), [method]: data } as T & { [P in U]: V }
    return new PathItem(pathItem)
  }

  /**
   * Creates a copy of the instance with the get added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { get: U }>}
   */
  $get<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { get: U }> {
    return this.$operation('get', data)
  }

  /**
   * Creates a copy of the instance with the put added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { put: U }>}
   */
  $put<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { put: U }> {
    return this.$operation('put', data)
  }

  /**
   * Creates a copy of the instance with the post added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { post: U }>}
   */
  $post<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { post: U }> {
    return this.$operation('post', data)
  }

  /**
   * Creates a copy of the instance with the delete added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { delete: U }>}
   */
  $delete<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { delete: U }> {
    return this.$operation('delete', data)
  }

  /**
   * Creates a copy of the instance with the options added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { options: U }>}
   */
  $options<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { options: U }> {
    return this.$operation('options', data)
  }

  /**
   * Creates a copy of the instance with the head added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { head: U }>}
   */
  $head<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { head: U }> {
    return this.$operation('head', data)
  }

  /**
   * Creates a copy of the instance with the patch added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { patch: U }>}
   */
  $patch<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { patch: U }> {
    return this.$operation('patch', data)
  }

  /**
   * Creates a copy of the instance with the trace added.
   *
   * @template T, U
   * @param {U} [data]
   * @returns {PathItem<T & { trace: U }>}
   */
  $trace<U extends OperationObjectType = OperationObjectType> (data?: U): PathItem<T & { trace: U }> {
    return this.$operation('trace', data)
  }
}
