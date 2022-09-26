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
  tags?: T['tags']
  summary?: T['summary']
  description?: T['description']
  externalDocs?: ExternalDocumentation<NonNullable<T['externalDocs']>>
  operationId?: T['operationId']
  parameters?: ParameterCollection<T['parameters']>
  requestBody?: ToRequestBody<T['requestBody']> | ToReference<T['requestBody']>
  responses?: ResponseRecord<T['responses']>
  callbacks?: PathItemRecord<T['callbacks']>
  deprecated?: T['deprecated']
  security?: T['security']
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

  $tag<U extends string> (name: U): Operation<T & { tags: [...NonNullable<T['tags']>, U] }> {
    const json = this.json()
    const tags = [...(json.tags ?? []), name]
    return new Operation({ ...json, tags })
  }

  $summary<U extends string>(summary: U): Operation<T & { summary: U }> {
    return new Operation({ ...this.json(), summary })
  }

  $description<U extends string> (description: U): Operation<T & { description: U }> {
    return new Operation({ ...this.json(), description })
  }

  $externalDocs<U extends ExternalDocumentationObjectType> (data: U): Operation<T & { externalDocs: U }> {
    return new Operation({ ...this.json(), externalDocs: data })
  }

  $operationId<U extends string = string> (operationId: string): Operation<T & { operationId: U }> {
    return new Operation({ ...this.json(), operationId })
  }

  $deprecated<U extends boolean = boolean> (deprecated: U): Operation<U & { deprecated: U }> {
    return new Operation({ ...this.json(), deprecated })
  }

  $parameter<U extends ParameterObjectType = ParameterObjectType> (data: U): Operation<T & { parameters: [...NonNullable<T['parameters']>, U] }> {
    const json = this.json()
    const parameters = [...(json.parameters ?? []) ?? [], data]
    return new Operation({ ...json, parameters })
  }

  $body<U extends RequestBodyObjectType = RequestBodyObjectType> (data: U): Operation<T & { requestBody: U }> {
    return new Operation({ ...this.json(), requestBody: data })
  }

  $response<U extends string, V extends ResponseObjectType> (statusCode: U, data: V): Operation<T & { responses: T['responses'] & { [P in U]: V } }> {
    const responses = { ...this.responses, [statusCode]: data }
    return new Operation({ ...this.json(), responses })
  }

  $callback<U extends string, V extends PathItemObjectType> (expression: U, data: V): Operation<T & { callbacks: T['callbacks'] & { [P in U]: V } }> {
    const callbacks = { ...this.callbacks, [expression]: data }
    return new Operation({ ...this.json(), callbacks })
  }

  $securityRequirement<U extends string, V extends string[]> (name: string, values: V): Operation<T & { security: [...NonNullable<T['security']>, { [P in U]: V }] }> {
    const json = this.json()
    const requirement = { [name]: values } as { [P in U]: V }
    const security = [...(json.security ?? []), requirement]
    return new Operation({ ...json, security })
  }

  $server<U extends ServerObjectType> (data: U): Operation<T & { servers: [...NonNullable<T['servers']>, U] }> {
    const servers = [...this.servers ?? [], data]
    return new Operation({ ...this.json(), servers })
  }
}
