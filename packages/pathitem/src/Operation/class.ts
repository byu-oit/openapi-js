import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  isResponseObject,
  Response,
  ResponseObjectType, ResponseRecord
} from '@byu-oit/openapi.response'
import {
  isParameterObject,
  Parameter,
  ParameterCollection,
  ParameterObjectType
} from '@byu-oit/openapi.parameter'
import {
  ExternalDocumentation,
  ExternalDocumentationObjectType
} from '@byu-oit/openapi.externaldocumentation'
import {
  RequestBody,
  RequestBodyObjectType, ToRequestBody
} from '@byu-oit/openapi.requestbody'
import { Server, ServerCollection, ServerObjectType } from '@byu-oit/openapi.server'
import {
  Reference,
  isReferenceObject,
  ToReference
} from '@byu-oit/openapi.reference'
import {
  isPathItemObject,
  PathItem,
  PathItemObjectType,
  PathItemRecord
} from '../PathItem'
import { isOperationObject, OperationObjectType } from './schema'

export class Operation<T extends OperationObjectType> extends BaseObject<T> {
  /**
   * A list of tags for API documentation control. Tags can be used for logical
   * grouping of operations by resources or any other qualifier.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  tags?: T['tags']

  /**
   * A short summary of what the operation does.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  summary?: T['summary']

  /**
   * A verbose explanation of the operation behavior. {@link https://spec.commonmark.org/ CommonMark syntax} MAY be
   * used for rich text representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  description?: T['description']

  /**
   * Additional external documentation for this operation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  externalDocs?: ExternalDocumentation<NonNullable<T['externalDocs']>>

  /**
   * Unique string used to identify the operation. The id MUST be unique among all
   * operations described in the API. The operationId value is case-sensitive. Tools
   * and libraries MAY use the operationId to uniquely identify an operation,
   * therefore, it is RECOMMENDED to follow common programming naming conventions.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  operationId?: T['operationId']

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
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  parameters?: ParameterCollection<T['parameters']>

  /**
   * The request body applicable for this operation. The requestBody is fully
   * supported in HTTP methods where the HTTP 1.1 specification [RFC7231] has
   * explicitly defined semantics for request bodies. In other cases where the HTTP
   * spec is vague (such as GET, HEAD and DELETE), requestBody is permitted but does
   * not have well-defined semantics and SHOULD be avoided if possible.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  requestBody?: ToRequestBody<T['requestBody']> | ToReference<T['requestBody']>

  /**
   * The list of possible responses as they are returned from executing this operation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  responses?: ResponseRecord<T['responses']>

  /**
   * A map of possible out-of band callbacks related to the parent operation. The key
   * is a unique identifier for the Callback Object. Each value in the map is a
   * Callback Object that describes a request that may be initiated by the API
   * provider and the expected responses.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  callbacks?: PathItemRecord<T['callbacks']>

  /**
   * Declares this operation to be deprecated. Consumers SHOULD refrain from usage of
   * the declared operation. Default value is false.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  deprecated?: T['deprecated']

  /**
   * A declaration of which security mechanisms can be used for this operation. The
   * list of values includes alternative security requirement objects that can be
   * used. Only one of the security requirement objects need to be satisfied to
   * authorize a request. To make security optional, an empty security requirement
   * ({}) can be included in the array. This definition overrides any declared
   * top-level security. To remove a top-level security declaration, an empty array
   * can be used.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  security?: T['security']

  /**
   * An alternative server array to service this operation. If an alternative server
   * object is specified at the Path Item Object or Root level, it will be overridden
   * by this value.
   *
   * {@link https://spec.openapis.org/oas/latest.html#operation-object Operation Object}
   */
  servers?: ServerCollection<T['servers']>

  constructor (data?: OperationObjectType) {
    super()

    if (data == null) {
      return
    }

    if (data.tags != null) {
      this.tags = data.tags
    }

    if (data.summary != null) {
      this.summary = data.summary
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.externalDocs != null) {
      this.externalDocs = new ExternalDocumentation(data.externalDocs) as ExternalDocumentation<NonNullable<T['externalDocs']>>
    }

    if (data.operationId != null) {
      this.operationId = data.operationId
    }

    if (data.parameters != null) {
      this.parameters = data.parameters.map(data => {
        if (isParameterObject.Check(data)) {
          return new Parameter(data)
        }
        return new Reference(data)
      }) as ParameterCollection<T['parameters']>
    }

    if (data.requestBody != null) {
      if (isReferenceObject.Check(data.requestBody)) {
        this.requestBody = new Reference(data.requestBody) as ToReference<T['requestBody']>
      } else {
        this.requestBody = new RequestBody(data.requestBody) as ToRequestBody<T['requestBody']>
      }
    }

    if (data.responses != null) {
      this.responses = Object.entries(data.responses).reduce((agg, [basename, data]) => {
        const response = isResponseObject.Check(data) ? new Response(data) : new Reference(data)
        return { ...agg, [basename]: response }
      }, {} as ResponseRecord<T['responses']>)
    }

    if (data.callbacks != null) {
      this.callbacks = Object.entries(data.callbacks).reduce((agg, [basename, data]) => {
        const response = isPathItemObject.Check(data) ? new PathItem(data) : new Reference(data)
        return { ...agg, [basename]: response }
      }, {} as PathItemRecord<T['responses']>)
    }

    if (data.deprecated != null) {
      this.deprecated = data.deprecated
    }

    if (data.security != null) {
      this.security = data.security
    }

    if (data.servers != null) {
      this.servers = data.servers.map(data => new Server(data)) as ServerCollection<T['servers']>
    }
  }

  static from<T extends OperationObjectType = OperationObjectType> (data: unknown): Operation<T> {
    const valid = Operation.validator.Check(data)
    if (!valid) throw new TypeCheckError(Operation.validator, data)
    return new Operation(data)
  }

  static validator = isOperationObject

  /**
   * Creates a copy of the instance with the tag added.
   *
   * @template T, U
   * @param {U} name
   * @returns {Operation<T & { tags: [...NonNullable<T['tags']>, U] }>}
   */
  $tag<U extends string> (name: U): Operation<T & { tags: [...NonNullable<T['tags']>, U] }> {
    const json = this.json()
    const tags = [...(json.tags ?? []), name]
    return new Operation({ ...json, tags })
  }

  /**
   * Creates a copy of the instance with the summary added.
   *
   * @template T, U
   * @param {U} summary
   * @returns {Operation<T & { summary: U }>}
   */
  $summary<U extends string> (summary: U): Operation<T & { summary: U }> {
    return new Operation({ ...this.json(), summary })
  }

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {Operation<T & { description: U }>}
   */
  $description<U extends string> (description: U): Operation<T & { description: U }> {
    return new Operation({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the externalDocs added.
   *
   * @template T, U
   * @param {U} data
   * @returns {Operation<T & { externalDocs: U }>}
   */
  $externalDocs<U extends ExternalDocumentationObjectType> (data: U): Operation<T & { externalDocs: U }> {
    return new Operation({ ...this.json(), externalDocs: data })
  }

  /**
   * Creates a copy of the instance with the operationId added.
   *
   * @template T, U
   * @param {string} operationId
   * @returns {Operation<T & { operationId: U }>}
   */
  $operationId<U extends string = string> (operationId: string): Operation<T & { operationId: U }> {
    return new Operation({ ...this.json(), operationId })
  }

  /**
   * Creates a copy of the instance with the deprecated added.
   *
   * @template T, U
   * @param {U} deprecated
   * @returns {Operation<T & { deprecated: U }>}
   */
  $deprecated<U extends boolean = boolean> (deprecated: U): Operation<T & { deprecated: U }> {
    return new Operation({ ...this.json(), deprecated })
  }

  /**
   * Creates a copy of the instance with the parameters added.
   *
   * @template T, U
   * @param {U} data
   * @returns {Operation<T & { parameters: [...NonNullable<T['parameters']>, U] }>}
   */
  $parameter<U extends ParameterObjectType = ParameterObjectType> (data: U): Operation<T & { parameters: [...NonNullable<T['parameters']>, U] }> {
    const json = this.json()
    const parameters = [...(json.parameters ?? []) ?? [], data]
    return new Operation({ ...json, parameters })
  }

  /**
   * Creates a copy of the instance with the requestBody added.
   *
   * @template T, U
   * @param {U} data
   * @returns {Operation<T & { requestBody: U }>}
   */
  $body<U extends RequestBodyObjectType = RequestBodyObjectType> (data: U): Operation<T & { requestBody: U }> {
    return new Operation({ ...this.json(), requestBody: data })
  }

  /**
   * Creates a copy of the instance with the response added.
   *
   * @template T, U, V, P
   * @param {U} statusCode
   * @param {V} data
   * @returns {Operation<T & { responses: T['responses'] & { [P in U]: V } }>}
   */
  $response<U extends string, V extends ResponseObjectType> (statusCode: U, data: V): Operation<T & { responses: T['responses'] & { [P in U]: V } }> {
    const responses = { ...this.responses, [statusCode]: data }
    return new Operation({ ...this.json(), responses })
  }

  /**
   * Creates a copy of the instance with the callback added.
   *
   * @template T, U, V, P
   * @param {U} expression
   * @param {V} data
   * @returns {Operation<T & { callbacks: T['callbacks'] & { [P in U]: V } }>}
   */
  $callback<U extends string, V extends PathItemObjectType> (expression: U, data: V): Operation<T & { callbacks: T['callbacks'] & { [P in U]: V } }> {
    const callbacks = { ...this.callbacks, [expression]: data }
    return new Operation({ ...this.json(), callbacks })
  }

  /**
   * Creates a copy of the instance with the securityRequirement added.
   *
   * @template T, U, V, P
   * @param {string} name
   * @param {V} values
   * @returns {Operation<T & { security: [...NonNullable<T['security']>, { [P in U]: V }] }>}
   */
  $securityRequirement<U extends string, V extends string[]> (name: string, values: V): Operation<T & { security: [...NonNullable<T['security']>, { [P in U]: V }] }> {
    const json = this.json()
    const requirement = { [name]: values } as { [P in U]: V }
    const security = [...(json.security ?? []), requirement]
    return new Operation({ ...json, security })
  }

  /**
   * Creates a copy of the instance with the server added.
   *
   * @template T, U
   * @param {U} data
   * @returns {Operation<T & { servers: [...NonNullable<T['servers']>, U] }>}
   */
  $server<U extends ServerObjectType> (data: U): Operation<T & { servers: [...NonNullable<T['servers']>, U] }> {
    const servers = [...this.servers ?? [], data]
    return new Operation({ ...this.json(), servers })
  }
}
