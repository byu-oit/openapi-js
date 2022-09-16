import { Base, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { ServerVariable, ServerVariableObjectType } from '@byu-oit/openapi.servervariable'
import { isServerObject, ServerObjectType } from './schema'

export class Server<T extends ServerObjectType> extends Base implements ServerObjectType {
  url!: T['url']
  description?: T['description']
  variables?: T['variables']

  constructor (data: T)
  constructor (url: T['url'], data?: Omit<T, 'url'>)
  constructor (url: T['url'] | T, data?: Omit<T, 'url'>) {
    super()
    const server: ServerObjectType = typeof url === 'string'
      ? { ...data, url }
      : url
    Object.assign(this, server)
  }

  static from<T extends ServerObjectType = ServerObjectType> (data: unknown): Server<T> {
    const valid = Server.validator.Check(data)
    if (!valid) throw new TypeCheckError(Server.validator, data)
    return new Server(data) as Server<T>
  }

  static validator = isServerObject

  $url<U extends string> (url: U): Server<T & { url: U }> {
    return new Server({ ...this.json(), url })
  }

  $description (description: string): Server<T> {
    return new Server({ ...this.json(), description })
  }

  $variable<U extends string, V extends ServerVariableObjectType> (name: U, data: V): Server<T & { variables: Merge<T['variables'], { [P in U]: ServerVariable<V> }> }> {
    const server = {
      ...this.json(),
      variables: {
        ...this.variables,
        [name]: new ServerVariable(data)
      }
    }
    return new Server(server)
  }
}
