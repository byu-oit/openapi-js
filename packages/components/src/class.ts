import { Base, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { SchemaObjectType } from '@byu-oit/openapi.schema'
import { Header, HeaderObjectType } from '@byu-oit/openapi.header'
import {
  Response,
  ResponseObjectType
} from '@byu-oit/openapi.response'
import {
  Parameter,
  ParameterObjectType
} from '@byu-oit/openapi.parameter'
import {
  RequestBody,
  RequestBodyObjectType
} from '@byu-oit/openapi.requestbody'
import { Link, LinkObjectType } from '@byu-oit/openapi.link'
import {
  PathItem,
  PathItemObjectType
} from '@byu-oit/openapi.pathitem'
import {
  SecurityScheme,
  SecuritySchemeObjectType
} from '@byu-oit/openapi.securityscheme'
import { Example } from '@byu-oit/openapi.example'
import {
  ComponentsObjectType,
  isComponentsObject
} from './schema'

export class Components<T extends ComponentsObjectType> extends Base implements ComponentsObjectType {
  schemas?: T['schemas']
  responses?: T['responses']
  parameters?: T['parameters']
  requestBodies?: T['requestBodies']
  headers?: T['headers']
  securitySchemes?: T['securitySchemes']
  links?: T['links']
  callbacks?: T['callbacks']
  pathItems?: T['pathItems']
  examples?: T['examples']

  constructor (data?: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends ComponentsObjectType = ComponentsObjectType> (data: unknown): Components<T> {
    const valid = Components.validator.Check(data)
    if (!valid) throw new TypeCheckError(Components.validator, data)
    return new Components(data) as Components<T>
  }

  static validator = isComponentsObject

  $schema<U extends string, V extends SchemaObjectType> (basename: U, schema: V): Components<T & { schemas: Merge<T['schemas'], { [P in U]: V }> }> {
    const schemas = { ...this.schemas, [basename]: schema }
    return new Components({ ...this.json(), schemas })
  }

  $response<U extends string, V extends ResponseObjectType> (basename: U, data: V): Components<T & { responses: Merge<T['schemas'], { [P in U]: Response<V> }> }> {
    const responses = { ...this.responses, [basename]: new Response(data) }
    return new Components({ ...this.json(), responses })
  }

  $parameter<U extends string, V extends ParameterObjectType> (basename: U, data: V): Components<T & { parameters: Merge<T['parameters'], { [P in U]: Parameter<V> }> }> {
    const parameters = { ...this.parameters, [basename]: new Parameter(data) }
    return new Components({ ...this.json(), parameters })
  }

  $query<U extends string, V extends Omit<ParameterObjectType, 'in'>> (basename: U, data: V): Components<T & { parameters: Merge<T['parameters'], { [P in U]: Parameter<V & { in: 'query' }> }> }> {
    return this.$parameter(basename, { ...data, in: 'query' })
  }

  $path<U extends string, V extends Omit<ParameterObjectType, 'in'>> (basename: U, data: V): Components<T & { parameters: Merge<T['parameters'], { [P in U]: Parameter<V & { in: 'path' }> }> }> {
    return this.$parameter(basename, { ...data, in: 'path' })
  }

  $cookie<U extends string, V extends Omit<ParameterObjectType, 'in'>> (basename: U, data: V): Components<T & { parameters: Merge<T['parameters'], { [P in U]: Parameter<V & { in: 'cookie' }> }> }> {
    return this.$parameter(basename, { ...data, in: 'cookie' })
  }

  $body<U extends string, V extends RequestBodyObjectType> (basename: U, data: V): Components<T & { requestBodies: Merge<T['requestBodies'], { [P in U]: RequestBody<V> }> }> {
    const requestBodies = { ...this.requestBodies, [basename]: new RequestBody(data) }
    return new Components({ ...this.json(), requestBodies })
  }

  $header<U extends string, V extends HeaderObjectType> (basename: U, data: V): Components<T & { headers: Merge<T['headers'], { [P in U]: Header<V> }> }> {
    const headers = { ...this.headers, [basename]: new Header(data) }
    return new Components({ ...this.json(), headers })
  }

  $securityScheme<U extends string, V extends SecuritySchemeObjectType> (basename: U, data: V): Components<T & { securitySchemes: Merge<T['securitySchemes'], { [P in U]: SecurityScheme<V> }> }> {
    const securitySchemes = { ...this.securitySchemes, [basename]: new SecurityScheme(data) }
    return new Components({ ...this.json(), securitySchemes })
  }

  $link<U extends string, V extends LinkObjectType> (basename: U, data: V): Components<T & { links: Merge<T['links'], { [P in U]: Link<V> }> }> {
    const links = { ...this.links, [basename]: new Link(data) }
    return new Components({ ...this.json(), links })
  }

  $callback<U extends string, V extends PathItemObjectType> (basename: U, data: V): Components<T & { callbacks: Merge<T['callbacks'], { [P in U]: PathItem<V> }> }> {
    const callbacks = { ...this.callbacks, [basename]: new PathItem(data) }
    return new Components({ ...this.json(), callbacks })
  }

  $pathItem<U extends string, V extends PathItemObjectType> (basename: U, data: V): Components<T & { pathItems: Merge<T['pathItems'], { [P in U]: V }> }> {
    const pathItems = { ...this.pathItems, [basename]: new PathItem(data) }
    return new Components({ ...this.json(), pathItems })
  }

  $example (basename: string, ...args: ConstructorParameters<typeof Example>): Components<T> {
    const examples = { ...this.examples, [basename]: new Example(...args) }
    return new Components({ ...this.json(), examples })
  }
}
