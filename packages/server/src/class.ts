import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  ServerVariable,
  ServerVariableObjectType,
  ServerVariableRecord
} from '@byu-oit/openapi.servervariable'
import { isServerObject, ServerObjectType } from './schema'

export class Server<T extends ServerObjectType> extends BaseObject<T> {
  /**
   * REQUIRED. A URL to the target host. This URL supports Server Variables and MAY be
   * relative, to indicate that the host location is relative to the location where
   * the OpenAPI document is being served. Variable substitutions will be made when a
   * variable is named in {brackets}.
   *
   * {@link https://spec.openapis.org/oas/latest.html#server-object Server Object}
   */
  url: T['url']

  /**
   * An optional string describing the host designated by the URL. CommonMark syntax
   * MAY be used for rich text representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#server-object Server Object}
   */
  description?: T['description']

  /**
   * A map between a variable name and its value. The value is used for substitution
   * in the server’s URL template.
   *
   * {@link https://spec.openapis.org/oas/latest.html#server-object Server Object}
   */
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

  /**
   * Creates a copy of the instance with the url added.
   *
   * @template T, U
   * @param {U} url
   * @returns {Server<T & { url: U }>}
   */
  $url<U extends string> (url: U): Server<T & { url: U }> {
    return new Server({ ...this.json(), url })
  }

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {Server<T & { description: U }>}
   */
  $description<U extends string>(description: U): Server<T & { description: U }> {
    return new Server({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the variable added.
   *
   * @template T, U, V, P
   * @param {U} name
   * @param {V} data
   * @returns {Server<T & { variables: T['variables'] & { [P in U]: V } }>}
   */
  $variable<U extends string, V extends ServerVariableObjectType> (name: U, data: V): Server<T & { variables: T['variables'] & { [P in U]: V } }> {
    const json = this.json()
    const variables = { ...(json.variables ?? []), [name]: data } as T['variables'] & { [P in U]: V }
    return new Server({ ...json, variables })
  }
}
