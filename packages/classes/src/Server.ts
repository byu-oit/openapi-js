import * as S from '@byu-oit/openapi-schemas'
import { ServerVariable } from './ServerVariable'
import { Base } from './Base'
import { Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class Server<T extends S.Server> extends Base implements S.Server {
  url!: T['url']
  description?: string
  variables?: T['variables']

  constructor (data: T)
  constructor (url: T['url'], data?: Omit<T, 'url'>)
  constructor (url: T['url'] | T, data?: Omit<T, 'url'>) {
    super()
    const server: S.Server = typeof url === 'string'
      ? { ...data, url }
      : url
    Object.assign(this, server)
  }

  static from<T extends S.Server = S.Server> (data: unknown): Server<T> {
    const valid = Server.validator.Check(data)
    if (!valid) throw new TypeCheckError(Server.validator, data)
    return new Server(data) as Server<T>
  }

  static validator = TypeCompiler.Compile(S.TServer)

  $url<U extends string> (url: U): Server<T & { url: U }> {
    return new Server({ ...this.json(), url })
  }

  $description (description: string): Server<T> {
    return new Server({ ...this.json(), description })
  }

  $variable<U extends string, V extends S.ServerVariable>(name: U, data: V): Server<T & { variables: Merge<T['variables'], { [P in U]: ServerVariable<V> }> }> {
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
