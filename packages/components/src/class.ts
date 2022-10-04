import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { SchemaObjectType } from '@byu-oit/openapi.schema'
import { Header, HeaderObjectType, HeaderRecord } from '@byu-oit/openapi.header'
import {
  Response,
  ResponseObjectType,
  ResponseRecord
} from '@byu-oit/openapi.response'
import {
  Parameter,
  ParameterObjectType,
  ParameterRecord
} from '@byu-oit/openapi.parameter'
import {
  RequestBody,
  RequestBodyObjectType,
  RequestBodyRecord
} from '@byu-oit/openapi.requestbody'
import { Link, LinkObjectType, LinkRecord } from '@byu-oit/openapi.link'
import {
  PathItem,
  PathItemObjectType,
  PathItemRecord
} from '@byu-oit/openapi.pathitem'
import {
  CallbackRecord,
  Callback,
  CallbackObjectType
} from '@byu-oit/openapi.callback'
import {
  SecurityScheme,
  SecuritySchemeObjectType,
  SecuritySchemeRecord
} from '@byu-oit/openapi.securityscheme'
import { Example, ExampleObjectType, ExampleRecord } from '@byu-oit/openapi.example'
import {
  ComponentsObjectType,
  isComponentsObject
} from './schema'
import { isReferenceObject, Reference } from '@byu-oit/openapi.reference'

/**
 * Holds a set of reusable objects for different aspects of the OAS. All objects
 * defined within the components object will have no effect on the API unless they are
 * explicitly referenced from properties outside the components object.
 */
export class Components<T extends ComponentsObjectType> extends BaseObject<T> {
  /**
   * An object to hold reusable (Schema Objects)[https://spec.openapis.org/oas/latest.html#schemaObject].
   *
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  schemas?: T['schemas']

  /**
   * An object to hold reusable (Response Objects)[https://spec.openapis.org/oas/latest.html#responseObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  responses?: ResponseRecord<T['responses']>

  /**
   * An object to hold reusable (Parameter Objects)[https://spec.openapis.org/oas/latest.html#parameterObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  parameters?: ParameterRecord<T['parameters']>

  /**
   * An object to hold reusable (Request Body Objects)[https://spec.openapis.org/oas/latest.html#requestBodyObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  requestBodies?: RequestBodyRecord<T['requestBodies']>

  /**
   * An object to hold reusable (Header Objects)[https://spec.openapis.org/oas/latest.html#headerObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  headers?: HeaderRecord<T['headers']>

  /**
   * An object to hold reusable (Security Scheme Objects)[https://spec.openapis.org/oas/latest.html#securitySchemeObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  securitySchemes?: SecuritySchemeRecord<T['securitySchemes']>

  /**
   * An object to hold reusable (Link Objects)[https://spec.openapis.org/oas/latest.html#linkObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  links?: LinkRecord<T['links']>

  /**
   * An object to hold reusable (Callback Objects)[https://spec.openapis.org/oas/latest.html#callbackObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  callbacks?: CallbackRecord<T['callbacks']>

  /**
   * An object to hold reusable (Path Item Object)[https://spec.openapis.org/oas/latest.html#pathItemObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  pathItems?: PathItemRecord<T['pathItems']>

  /**
   * An object to hold reusable (Example Objects)[https://spec.openapis.org/oas/latest.html#exampleObject].
   * 
   *  {@link https://spec.openapis.org/oas/latest.html#fixed-fields-5}
   */
  examples?: ExampleRecord<T['examples']>

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.schemas != null) {
      this.schemas = data.schemas
    }

    if (data.responses != null) {
      this.responses = Object.entries(data.responses).reduce((agg, [basename, data]) => {
        const response = isReferenceObject.Check(data) ? new Reference(data) : new Response(data)
        return { ...agg, [basename]: response }
      }, {} as ResponseRecord<T['responses']>)
    }

    if (data.parameters != null) {
      this.parameters = Object.entries(data.parameters).reduce((agg, [basename, data]) => {
        const parameter = isReferenceObject.Check(data) ? new Reference(data) : new Parameter(data)
        return { ...agg, [basename]: parameter }
      }, {} as ParameterRecord<T['parameters']>)
    }

    if (data.requestBodies != null) {
      this.requestBodies = Object.entries(data.requestBodies).reduce((agg, [basename, data]) => {
        const requestBody = isReferenceObject.Check(data) ? new Reference(data) : new RequestBody(data)
        return { ...agg, [basename]: requestBody }
      }, {} as RequestBodyRecord<T['requestBodies']>)
    }

    if (data.headers != null) {
      this.headers = Object.entries(data.headers).reduce((agg, [basename, data]) => {
        const header = isReferenceObject.Check(data) ? new Reference(data) : new Header(data)
        return { ...agg, [basename]: header }
      }, {} as HeaderRecord<T['headers']>)
    }

    if (data.securitySchemes != null) {
      this.securitySchemes = Object.entries(data.securitySchemes).reduce((agg, [basename, data]) => {
        const securityScheme = isReferenceObject.Check(data) ? new Reference(data) : new SecurityScheme(data)
        return { ...agg, [basename]: securityScheme }
      }, {} as SecuritySchemeRecord<T['securitySchemes']>)
    }

    if (data.links != null) {
      this.links = Object.entries(data.links).reduce((agg, [basename, data]) => {
        const link = isReferenceObject.Check(data) ? new Reference(data) : new Link(data)
        return { ...agg, [basename]: link }
      }, {} as LinkRecord<T['links']>)
    }

    if (data.callbacks != null) {
      this.callbacks = Object.entries(data.callbacks).reduce((agg, [basename, data]) => {
        const callback = isReferenceObject.Check(data) ? new Reference(data) : new Callback(data)
        return { ...agg, [basename]: callback }
      }, {} as CallbackRecord<T['callbacks']>)
    }

    if (data.pathItems != null) {
      this.pathItems = Object.entries(data.pathItems).reduce((agg, [basename, data]) => {
        const pathItem = isReferenceObject.Check(data) ? new Reference(data) : new PathItem(data)
        return { ...agg, [basename]: pathItem }
      }, {} as PathItemRecord<T['pathItems']>)
    }

    if (data.examples != null) {
      this.examples = Object.entries(data.examples).reduce((agg, [basename, data]) => {
        const example = isReferenceObject.Check(data) ? new Reference(data) : new Example(data)
        return { ...agg, [basename]: example }
      }, {} as ExampleRecord<T['examples']>)
    }
  }

  static from<T extends ComponentsObjectType = ComponentsObjectType> (data: unknown): Components<T> {
    const valid = Components.validator.Check(data)
    if (!valid) throw new TypeCheckError(Components.validator, data)
    return new Components(data) as Components<T>
  }

  static validator = isComponentsObject 

  /**
   * Creates a copy of the instance with the basename property set to the schema.
   * 
   * @template U, V, T, P
   * @param {U} basename  The basename of the property.
   * @param {T} schema The schema added to the basename property.
   * @returns {Components<T & { schemas: T['schemas'] & { [P in U]: V } }>}
   */
  $schema<U extends string, V extends SchemaObjectType> (basename: U, schema: V): Components<T & { schemas: T['schemas'] & { [P in U]: V } }> {
    const schemas = { ...this.schemas, [basename]: schema } as T['schemas'] & { [P in U]: V }
    return new Components({ ...this.json(), schemas })
  }

  /**
   * Creates a copy of the instance with the response property added and basename set to data.
   * 
   * @template T, P, V, U
   * @param {U} basename The basename of the property.
   * @param {V} data The data added to the basename property.
   * @returns {Components<T & { responses: T['schemas'] & { [P in U]: V } }>}
   */
  $response<U extends string, V extends ResponseObjectType> (basename: U, data: V): Components<T & { responses: T['schemas'] & { [P in U]: V } }> {
    const json = this.json()
    const responses = { ...(json.responses ?? []), [basename]: data } as T['schemas'] & { [P in U]: V }
    return new Components({ ...json, responses })
  }

  /**
   * Creates a copy of the instance with an added parameter of basename set to data.
   * 
   * @template T, P, V, U
   * @param {U} basename The basename of the property.
   * @param {V} data The data added to the basename property. 
   * @returns {Components<T & { parameters: T['parameters'] & { [P in U]: V } }>}
   */
  $parameter<U extends string, V extends ParameterObjectType> (basename: U, data: V): Components<T & { parameters: T['parameters'] & { [P in U]: V } }> {
    const json = this.json()
    const parameters = { ...this.parameters, [basename]: data } as T['parameters'] & { [P in U]: V }
    return new Components({ ...json, parameters })
  }

  /**
   * Creates a copy of the instance with an added query property of basename set to data. 
   * 
   * @template T, P, V, U
   * @param {U} basename The basename of the property.
   * @param {V} data The data added to the basename property.
   * @returns {Components<T & { parameters: T['parameters'] & { [P in U]: V & { in: 'query' } } }>}
   */
  $query<U extends string, V extends Omit<ParameterObjectType, 'in'>> (basename: U, data: V): Components<T & { parameters: T['parameters'] & { [P in U]: V & { in: 'query' } } }> {
    return this.$parameter(basename, { ...data, in: 'query' })
  }
  /**
  * Creates a copy of the instance with an added path property of basename set to data.
  * 
  * @template T, P, V, U
  * @param {U} basename The basename of the property.
  * @param {V} data The data added to the basename property.
  * @returns {Components<T & { parameters: T['parameters'] & { [P in U]: V & { in: 'path' } } }>}
  */
  $path<U extends string, V extends Omit<ParameterObjectType, 'in'>> (basename: U, data: V): Components<T & { parameters: T['parameters'] & { [P in U]: V & { in: 'path' } } }> {
    return this.$parameter(basename, { ...data, in: 'path' })
  }

  /**
  * Creates a copy of the instance with an added cookie property of basename set to data.
  * 
  * @template T, P, V, U
  * @param {U} basename The basename of the property.
  * @param {V} data The data added to the basename property.
  * @returns {Components<T & { parameters: T['parameters'] & { [P in U]: V & { in: 'cookie' } } }>}
 */  
  $cookie<U extends string, V extends Omit<ParameterObjectType, 'in'>> (basename: U, data: V): Components<T & { parameters: T['parameters'] & { [P in U]: V & { in: 'cookie' } } }> {
    return this.$parameter(basename, { ...data, in: 'cookie' })
  }
  /**
  * Creates a copy of the instance with an added property of basename set to data.
  * 
  * @template T, P, V, U
  * @param {U} basename The basename of the property.
  * @param {V} data The data added to the basename property.
  * @returns {Components<T & { requestBodies: T['requestBodies'] & { [P in U]: V } }>}
  */
  $body<U extends string, V extends RequestBodyObjectType> (basename: U, data: V): Components<T & { requestBodies: T['requestBodies'] & { [P in U]: V } }> {
    const json = this.json()
    const requestBodies = { ...(json.requestBodies ?? []), [basename]: data } as T['requestBodies'] & { [P in U]: V }
    return new Components({ ...json, requestBodies })
  }
  /**
  * Creates a copy of the instance with an added property of basename set to data.
  * 
  * @template T, P, V, U
  * @param {U} basename The basename of the property.
  * @param {V} data The data added to the basename property.
  * @returns {Components<T & { headers: T['headers'] & { [P in U]: V } }>}
  */
  $header<U extends string, V extends HeaderObjectType> (basename: U, data: V): Components<T & { headers: T['headers'] & { [P in U]: V } }> {
    const json = this.json()
    const headers = { ...(json.headers ?? []), [basename]: data } as T['headers'] & { [P in U]: V }
    return new Components({ ...json, headers })
  }
  /**
  * Creates a copy of the instance with an added property of basename set to data.
  * 
  * @template T, P, V, U
  * @param {U} basename The basename of the property.
  * @param {V} data The data added to the basename property.
  * @returns {Components<T & { securitySchemes: T['securitySchemes'] & { [P in U]: V } }>}
  */
  $securityScheme<U extends string, V extends SecuritySchemeObjectType> (basename: U, data: V): Components<T & { securitySchemes: T['securitySchemes'] & { [P in U]: V } }> {
    const json = this.json()
    const securitySchemes = { ...(json.securitySchemes ?? []), [basename]: data } as T['securitySchemes'] & { [P in U]: V }
    return new Components({ ...json, securitySchemes })
  }
  /**
   * Creates a copy of the instance with an added property of basename set to data.
   * 
   * @template T, P, V, U
   * @param {U} basename The basename of the property.
   * @param {V} data The data added to the basename property.
   * @returns {Components<T & { links: T['links'] & { [P in U]: V } }>}
   */
  $link<U extends string, V extends LinkObjectType> (basename: U, data: V): Components<T & { links: T['links'] & { [P in U]: V } }> {
    const links = { ...this.links, [basename]: data } as T['links'] & { [P in U]: V }
    return new Components({ ...this.json(), links })
  }
  /**
   * Creates a copy of the instance with an added property of basename set to data.
   * 
   * @template T, P, V, U
   * @param {U} basename The basename of the property.
   * @param {V} data The data added to the basename property.
   * @returns {Components<T & { callbacks: T['callbacks'] & { [P in U]: V } }>}
   */
  $callback<U extends string, V extends CallbackObjectType> (basename: U, data: V): Components<T & { callbacks: T['callbacks'] & { [P in U]: V } }> {
    const json = this.json()
    const callbacks = { ...(json.callbacks ?? []), [basename]: data } as T['callbacks'] & { [P in U]: V }
    return new Components({ ...json, callbacks })
  }
  /**
   * Creates a copy of the instance with an added property of basename set to data.
   * 
   * @template T, P, V, U
   * @param {U} basename The basename of the property.
   * @param {V} data The data added to the basename property.
   * @returns {Components<T & { pathItems: T['pathItems'] & { [P in U]: V } }>}
   */
  $pathItem<U extends string, V extends PathItemObjectType> (basename: U, data: V): Components<T & { pathItems: T['pathItems'] & { [P in U]: V } }> {
    const json = this.json()
    const pathItems = { ...(json.pathItems ?? []), [basename]: data } as T['pathItems'] & { [P in U]: V }
    return new Components({ ...json, pathItems })
  }
  /**
   * Creates a copy of the instance with an added property of basename set to data.
   * 
   * @template T, P, V, U
   * @param {U} basename The basename of the property.
   * @param {V} data The data added to the basename property.
   * @returns {Components<T & { examples: T['examples'] & { [P in U]: V } }>}
   */
  $example<U extends string, V extends ExampleObjectType> (basename: U, data: V): Components<T & { examples: T['examples'] & { [P in U]: V } }> {
    const json = this.json()
    const examples = { ...(json.examples ?? []), [basename]: data } as T['examples'] & { [P in U]: V }
    return new Components({ ...json, examples })
  }
}
