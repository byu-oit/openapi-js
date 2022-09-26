import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  ServerVariable,
  ServerVariableObjectType,
  ServerVariableRecord
} from '@byu-oit/openapi.servervariable'
import { isServerObject, ServerObjectType } from './schema'

export class Server<T extends ServerObjectType> extends BaseObject<T> {
  url: T['url']
  description?: T['description']
  variables?: ServerVariableRecord<T['variables']>

  constructor (data: T) {
    super()

    this.url = data.url

    if (data.description != null) {
      this.description = data.description
    }

    if (data.variables != null) {
      this.variables = Object.entries(data.variables).reduce((agg, [basename, data]) => {
        const serverVariable = new ServerVariable(data)
        return { ...agg, [basename]: serverVariable }
      }, {} as ServerVariableRecord<T['variables']>)
    }
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

  $description<U extends string>(description: U): Server<T & { description: U }> {
    return new Server({ ...this.json(), description })
  }

  $variable<U extends string, V extends ServerVariableObjectType> (name: U, data: V): Server<T & { variables: T['variables'] & { [P in U]: V } }> {
    const json = this.json()
    const variables = { ...(json.variables ?? []), [name]: data } as T['variables'] & { [P in U]: V }
    return new Server({ ...json, variables })
  }
}
