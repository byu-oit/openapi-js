import { Server, ServerObjectType } from '@byu-oit/openapi.server'
import { BaseObject } from '@byu-oit/openapi.common'
import { TypeCheckError } from '@byu-oit/openapi.common'
import { isLinkObject, LinkObjectType } from './schema'

export class Link<T extends LinkObjectType> extends BaseObject<T> {
  operationRef?: T['operationRef']
  operationId?: T['operationId']
  parameters?: T['parameters']
  requestBody?: T['requestBody']
  description?: T['description']
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

  $operationRef<U extends string> (operationRef: U): Link<T & { operationRef: U }> {
    return new Link({ ...this.json(), operationRef })
  }

  $operationId<U extends string> (operationId: U): Link<T & { operationId: U }> {
    return new Link({ ...this.json(), operationId })
  }

  $parameter<U extends string, V> (name: U, expression: V): Link<T & { parameters: T['parameters'] & { [P in U]: V } }> {
    const json = this.json()
    const parameters = { ...(json.parameters ?? []), [name]: expression } as T['parameters'] & { [P in U]: V }
    return new Link({ ...json, parameters })
  }

  $body<U> (requestBody: U): Link<T & { requestBody: U }> {
    return new Link({ ...this.json(), requestBody })
  }

  $description<U extends string>(description: U): Link<T & { description: U }> {
    return new Link({ ...this.json(), description })
  }

  $server<U extends ServerObjectType> (data: U): Link<T & { server: U }> {
    return new Link({ ...this.json(), server: new Server(data) })
  }
}
