import { Server, ServerObjectType } from '@byu-oit/openapi.server'
import { BaseObject } from '@byu-oit/openapi.common'
import { TypeCheckError } from '@byu-oit/openapi.common'
import { isLinkObject, LinkObjectType } from './schema'

/**
 * The Link object represents a possible design-time link for a response. The presence of a link does not guarantee the caller’s ability to successfully invoke it, rather it provides a known relationship and traversal mechanism between responses and other operations.

Unlike dynamic links (i.e. links provided in the response payload), the OAS linking mechanism does not require link information in the runtime response.

For computing links, and providing instructions to execute them, a (runtime expression)[https://spec.openapis.org/oas/latest#runtimeExpression] is used for accessing values in an operation and using them as parameters while invoking the linked operation.
 * 
 * Source: https://spec.openapis.org/oas/latest#link-object
 */
export class Link<T extends LinkObjectType> extends BaseObject<T> {

  /**
   * A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the operationId field, and MUST point to an (Operation Object)[https://spec.openapis.org/oas/latest#operationObject]. 
   * Relative operationRef values MAY be used to locate an existing (Operation Object)[https://spec.openapis.org/oas/latest#operationObject] in the OpenAPI definition. See the rules for resolving (Relative References)[https://spec.openapis.org/oas/latest#relativeReferencesURI].
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-16
   */
  operationRef?: T['operationRef']
  
  /**
   * The name of an existing, resolvable OAS operation, as defined with a unique operationId. This field is mutually exclusive of the operationRef field.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-16
   */
  operationId?: T['operationId']
  
  /**
   * A map representing parameters to pass to an operation as specified with operationId or identified via operationRef. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked operation. 
   * The parameter name can be qualified using the (parameter location)[https://spec.openapis.org/oas/latest#parameterIn] [{in}.]{name} for operations that use the same parameter name in different locations (e.g. (path.id)[http://path.id/]).
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-16
   */
  parameters?: T['parameters']
  
  /**
   * A literal value or {(expression)[https://spec.openapis.org/oas/latest#runtimeExpression]} to use as a request body when calling the target operation.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-16
   */
  requestBody?: T['requestBody']
  
  /**
   * A description of the link. (CommonMark syntax)[https://spec.commonmark.org/] MAY be used for rich text representation.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-16
   */
  description?: T['description']
  
  /**
   * A server object to be used by the target operation.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-16
   */
  server?: Server<NonNullable<T['server']>>

  constructor (data?: LinkObjectType) {
    super()

    if (data == null) {
      return
    }

    if (data.operationRef != null) {
      this.operationRef = data.operationRef
    }

    if (data.operationId != null) {
      this.operationId = data.operationId
    }

    if (data.parameters != null) {
      this.parameters = data.parameters
    }

    if (data.requestBody != null) {
      this.requestBody = data.requestBody
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.server != null) {
      this.server = new Server(data.server)
    }
  }

  static from<T extends LinkObjectType = LinkObjectType> (data: unknown): Link<T> {
    const valid = Link.validator.Check(data)
    if (!valid) throw new TypeCheckError(Link.validator, data)
    return new Link(data)
  }

  static validator = isLinkObject

  /**
   * Creates a copy of the instance with the operationRef property added.
   * 
   * @template T, U
   * @param {U} operationRef The operationRef to be added to the Link object.
   * @returns {Link<T & { operationRef: U }>}
   */
  $operationRef<U extends string> (operationRef: U): Link<T & { operationRef: U }> {
    return new Link({ ...this.json(), operationRef })
  }

  /**
   * Creates a copy of the instance with the operationId property added.
   * 
   * @template T, U
   * @param {U} operationId The operationId to be added to the Link object.
   * @returns {Link<T & { operationId: U }>}
   */
  $operationId<U extends string> (operationId: U): Link<T & { operationId: U }> {
    return new Link({ ...this.json(), operationId })
  }

  /**
   * Creates a copy of the instance with the paramerter property added.
   * 
   * @template T, U, V, P
   * @param {U} name The name to be added to the Link object.
   * @param {V} expression The expression to be added to the Link object.
   * @returns {Link<T & { parameters: T['parameters'] & { [P in U]: V } }>}
   */
  $parameter<U extends string, V> (name: U, expression: V): Link<T & { parameters: T['parameters'] & { [P in U]: V } }> {
    const json = this.json()
    const parameters = { ...(json.parameters ?? []), [name]: expression } as T['parameters'] & { [P in U]: V }
    return new Link({ ...json, parameters })
  }

  /**
   * Creates a copy of the instance with the body property added.
   * 
   * @template T, U
   * @param {U} requestBody The requestBody to be added to the Link object. 
   * @returns {Link<T & { requestBody: U }> }
   */
  $body<U> (requestBody: U): Link<T & { requestBody: U }> {
    return new Link({ ...this.json(), requestBody })
  }

  /**
   * Creates a copy of the instance with the description property added.
   * 
   * @template T, U
   * @param {U} description The description to be added to the Link object.
   * @returns {Link<T & { description: U }>}
   */
  $description<U extends string>(description: U): Link<T & { description: U }> {
    return new Link({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the server property added.
   * 
   * @template T, U
   * @param {U} data The data to be added to the Link object.
   * @returns {Link<T & { server: U }>}
   */
  $server<U extends ServerObjectType> (data: U): Link<T & { server: U }> {
    return new Link({ ...this.json(), server: new Server(data) })
  }
}
