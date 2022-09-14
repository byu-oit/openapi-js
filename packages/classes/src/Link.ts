import * as S from '@byu-oit/openapi-schemas'
import { Server } from './Server'
import { Base } from './Base'
import { Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class Link<T extends S.Link> extends Base implements S.Link {
  operationRef?: T['operationRef']
  operationId?: T['operationId']
  parameters?: T['parameters']
  requestBody?: T['requestBody']
  description?: string
  server?: T['server']

  constructor (data?: S.Link) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.Link = S.Link> (data: unknown): Link<T> {
    const valid = Link.validator.Check(data)
    if (!valid) throw new TypeCheckError(Link.validator, data)
    return new Link(data) as Link<T>
  }

  static validator = TypeCompiler.Compile(S.TLink)

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

  $server<U extends S.Server> (data: U): Link<T & { server: U }> {
    return new Link({ ...this.json(), server: new Server(data) })
  }
}
