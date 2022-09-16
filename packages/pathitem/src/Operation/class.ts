import { Base, Merge, Push, TypeCheckError } from '@byu-oit/openapi.common'
import {
  Response,
  ResponseObjectType
} from '@byu-oit/openapi.response'
import {
  Parameter,
  ParameterObjectType
} from '@byu-oit/openapi.parameter'
import {
  ExternalDocumentation,
  ExternalDocumentationObjectType
} from '@byu-oit/openapi.externaldocumentation'
import {
  RequestBody,
  RequestBodyObjectType
} from '@byu-oit/openapi.requestbody'
import { Server, ServerObjectType } from '@byu-oit/openapi.server'
import { PathItem, PathItemObjectType } from '../PathItem'
import { isOperationObject, OperationObjectType } from './schema'

export class Operation<T extends OperationObjectType> extends Base implements OperationObjectType {
  tags?: string[]
  summary?: string
  description?: string
  externalDocs?: T['externalDocs']
  operationId?: T['operationId']
  parameters?: T['parameters']
  requestBody?: T['requestBody']
  responses?: T['responses']
  callbacks?: T['callbacks']
  deprecated?: T['deprecated']
  security?: T['security']
  servers?: T['servers']

  constructor (data?: OperationObjectType) {
    super()
    Object.assign(this, data)
  }

  static from<T extends OperationObjectType = OperationObjectType> (data: unknown): Operation<T> {
    const valid = Operation.validator.Check(data)
    if (!valid) throw new TypeCheckError(Operation.validator, data)
    return new Operation(data) 
  }

  static validator = isOperationObject

  $tag<U extends string> (name: U): Operation<T & { tags: Push<T['tags'], U> }> {
    const tags = []
    if (this.tags != null) tags.push(...this.tags)
    tags.push(name)
    return new Operation({ ...this.json, tags })
  }

  $summary (summary: string): Operation<T> {
    return new Operation({ ...this.json(), summary })
  }

  $description (description: string): Operation<T> {
    return new Operation({ ...this.json(), description })
  }

  $externalDocs<U extends ExternalDocumentationObjectType> (data: U): Operation<T & { externalDocs: ExternalDocumentation<U> }> {
    return new Operation({
      ...this.json(),
      externalDocs: new ExternalDocumentation(data)
    })
  }

  $operationId<U extends string = string> (operationId: string): Operation<T & { operationId: U }> {
    return new Operation({ ...this.json(), operationId })
  }

  $deprecated<U extends boolean = boolean> (deprecated: U): Operation<U & { deprecated: U }> {
    return new Operation({ ...this.json(), deprecated })
  }

  $parameter<U extends ParameterObjectType = ParameterObjectType> (data: U): Operation<T & { parameters: Push<T['parameters'], Parameter<U>> }> {
    const parameters = [...this.parameters ?? [], new Parameter(data)]
    return new Operation({ ...this.json(), parameters })
  }

  $body<U extends RequestBodyObjectType = RequestBodyObjectType> (data: U): Operation<T & { requestBody: RequestBody<U> }> {
    const requestBody = new RequestBody(data)
    return new Operation({ ...this.json(), requestBody })
  }

  $response<U extends string, V extends ResponseObjectType> (statusCode: U, data: V): Operation<T & { responses: Merge<T['responses'], { [P in U]: Response<V> }> }> {
    const responses = {
      ...this.responses,
      [statusCode]: new Response(data)
    }
    return new Operation({ ...this.json(), responses })
  }

  $callback<U extends string, V extends PathItemObjectType> (expression: U, data: V): Operation<T & { callbacks: Merge<T['callbacks'], { [P in U]: PathItem<V> }> }> {
    const callbacks = {
      ...this.callbacks,
      [expression]: new PathItem(data)
    }
    return new Operation({ ...this.json(), callbacks })
  }

  $securityRequirement<U extends string> (name: string, values: string[]): Operation<T & { security: Push<T['security'], { [P in U]: string[] }> }> {
    const requirement = { [name]: values } as { [P in U]: string[] }
    const security = [...(this.security ?? []), requirement]
    return new Operation({ ...this.json(), security })
  }

  $server<U extends ServerObjectType> (data: U): Operation<T & { servers: Push<T['servers'], Server<U>> }> {
    const servers = [...this.servers ?? [], new Server(data)]
    return new Operation({ ...this.json(), servers })
  }
}
