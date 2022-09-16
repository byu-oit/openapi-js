import { Server, ServerObjectType } from '@byu-oit/openapi.server'
import { Base } from '@byu-oit/openapi.common'
import { Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { isLinkObject, LinkObjectType } from './schema'

export class Link<T extends LinkObjectType> extends Base implements LinkObjectType {
  operationRef?: T['operationRef']
  operationId?: T['operationId']
  parameters?: T['parameters']
  requestBody?: T['requestBody']
  description?: string
  server?: T['server']

  constructor (data?: LinkObjectType) {
    super()
    Object.assign(this, data)
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

  $parameter<U extends string, V> (name: U, expression: V): Link<T & { parameters: Merge<T['parameters'], { [P in U]: V }> }> {
    const parameters = { ...this.parameters, [name]: expression }
    return new Link({ ...this.json(), parameters })
  }

  $body<U> (requestBody: U): Link<T & { requestBody: U }> {
    return new Link({ ...this.json(), requestBody })
  }

  $description (description: string): Link<T> {
    return new Link({ ...this.json(), description })
  }

  $server<U extends ServerObjectType> (data: U): Link<T & { server: U }> {
    return new Link({ ...this.json(), server: new Server(data) })
  }
}
