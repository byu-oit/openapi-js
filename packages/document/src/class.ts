import { Info, InfoObjectType } from '@byu-oit/openapi.info'
import { Server, ServerCollection, ServerObjectType } from '@byu-oit/openapi.server'
import {
  PathItem,
  PathItemObjectType, PathItemRecord
} from '@byu-oit/openapi.pathitem'
import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Tag, TagObjectType } from '@byu-oit/openapi.tag'
import {
  ExternalDocumentation,
  ExternalDocumentationObjectType
} from '@byu-oit/openapi.externaldocumentation'
import {
  Components,
  ComponentsObjectType
} from '@byu-oit/openapi.components'
import { DocumentObjectType, isDocumentObject } from './schema'
import { Reference } from '@byu-oit/openapi.reference/src/class'
import { isReferenceObject } from '@byu-oit/openapi.reference'
import { TagCollection } from '@byu-oit/openapi.tag/src/types'

export class Document<T extends DocumentObjectType = DocumentObjectType> extends BaseObject<T> {
  /**
   * REQUIRED. This string MUST be the version number of the OpenAPI Specification
   * that the OpenAPI document uses. The openapi field SHOULD be used by tooling to
   * interpret the OpenAPI document. This is not related to the API info.version string.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  openapi: T['openapi']

  /**
   * REQUIRED. Provides metadata about the API. The metadata MAY be used by tooling as
   * required.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  info: Info<T['info']>

  /**
   * The default value for the $schema keyword within Schema Objects contained within
   * this OAS document. This MUST be in the form of a URI.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  jsonSchemaDialect?: T['jsonSchemaDialect']

  /**
   * An array of Server Objects, which provide connectivity information to a target
   * server. If the servers property is not provided, or is an empty array, the
   * default value would be a Server Object with a url value of /.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  servers?: ServerCollection<T['servers']>

  /**
   * The available paths and operations for the API.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  paths?: PathItemRecord<T['paths']>

  /**
   * The incoming webhooks that MAY be received as part of this API and that the API
   * consumer MAY choose to implement. Closely related to the callbacks feature, this
   * section describes requests initiated other than by an API call, for example by an
   * out of band registration. The key name is a unique string to refer to each
   * webhook, while the (optionally referenced) Path Item Object describes a request
   * that may be initiated by the API provider and the expected responses. An example
   * is available.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  webhooks?: PathItemRecord<T['webhooks']>

  /**
   * An element to hold various schemas for the document.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  components?: Components<NonNullable<T['components']>>

  /**
   * A declaration of which security mechanisms can be used across the API. The list
   * of values includes alternative security requirement objects that can be used.
   * Only one of the security requirement objects need to be satisfied to authorize a
   * request. Individual operations can override this definition. To make security
   * optional, an empty security requirement ({}) can be included in the array.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  security?: T['security']

  /**
   * A list of tags used by the document with additional metainput. The order of the
   * tags can be used to reflect on their order by the parsing tools. Not all tags
   * that are used by the Operation Object must be declared. The tags that are not
   * declared MAY be organized randomly or based on the tools’ logic. Each tag name in
   * the list MUST be unique.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  tags?: TagCollection<T['tags']>

  /**
   * Additional external documentation.
   *
   * Source: https://spec.openapis.org/oas/latest.html#schema
   */
  externalDocs?: ExternalDocumentation<NonNullable<T['externalDocs']>>

  constructor (data: T) {
    super()

    this.openapi = data.openapi

    this.info = new Info(data.info)

    if (data.jsonSchemaDialect != null) {
      this.jsonSchemaDialect = data.jsonSchemaDialect
    }

    if (data.servers != null) {
      this.servers = data.servers.map(data => new Server(data)) as ServerCollection<T['servers']>
    }

    if (data.paths != null) {
      this.paths = Object.entries(data.paths).reduce((agg, [basename, data]) => {
        const pathItem = isReferenceObject.Check(data) ? new Reference(data) : new PathItem(data)
        return { ...agg, [basename]: pathItem }
      }, {} as PathItemRecord<T['paths']>)
    }

    if (data.webhooks != null) {
      this.webhooks = Object.entries(data.webhooks).reduce((agg, [basename, data]) => {
        const pathItem = isReferenceObject.Check(data) ? new Reference(data) : new PathItem(data)
        return { ...agg, [basename]: pathItem }
      }, {} as PathItemRecord<T['webhooks']>)
    }

    if (data.components != null) {
      this.components = new Components(data.components) as Components<NonNullable<T['components']>>
    }

    if (data.security != null) {
      this.security = data.security
    }

    if (data.tags != null) {
      this.tags = data.tags.map(data => new Tag(data)) as TagCollection<T['tags']>
    }

    if (data.externalDocs != null) {
      this.externalDocs = new ExternalDocumentation(data.externalDocs) as ExternalDocumentation<NonNullable<T['externalDocs']>>
    }
  }

  /**
   * Validates that the passed in value is in the shape of an OpenAPI document.
   *
   * @template T
   * @param {unknown} value Any value to parse into an OpenAPI document.
   * @returns {Document<T>>} A valid OpenAPI document with functional programming
   * utilities.
   */
  static from<T extends DocumentObjectType = DocumentObjectType> (value: unknown): Document<T> {
    const valid = Document.validator.Check(value)
    if (!valid) throw new TypeCheckError(Document.validator, value)
    return new Document(value) as Document<T>
  }

  /**
   * A type guard for an OpenAPI document.
   */
  static validator = isDocumentObject

  /**
   * Changes the version of an OpenAPI object.
   *
   * @param {string} version The version of the OpenAPI specification to use.
   */
  $openapi<U extends string> (version: U): Document<T & { openapi: U }> {
    return new Document({ ...this.json(), openapi: version })
  }

  $info<U extends InfoObjectType> (data: U): Document<T & { info: U }> {
    return new Document({ ...this.json(), info: data })
  }

  $jsonSchemaDialect<U extends string> (jsonSchemaDialect: U): Document<T & { jsonSchemaDialect: U }> {
    return new Document({ ...this.json(), jsonSchemaDialect })
  }

  $server<U extends ServerObjectType> (data: U): Document<T & { servers: [...NonNullable<T['servers']>, U] }> {
    const servers = [...this.servers ?? [], data] as [...NonNullable<T['servers']>, U]
    return new Document({ ...this.json(), servers })
  }

  $path<U extends string, V extends PathItemObjectType> (path: U, data?: V): Document<T & { paths: T['paths'] & { [P in U]: V } }> {
    const json = this.json()
    const paths = { ...(json.paths ?? []), [path]: data } as T['paths'] & { [P in U]: V }
    return new Document({ ...json, paths })
  }

  $webhook<U extends string, V extends PathItemObjectType> (name: U, data?: V): Document<T & { webhooks: T['webhooks'] & { [P in U]: V } }> {
    const json = this.json()
    const webhooks = { ...(json.webhooks ?? []), [name]: data } as T['webhooks'] & { [P in U]: V }
    return new Document({ ...json, webhooks })
  }

  $components<U extends ComponentsObjectType> (data: U): Document<T & { components: U }> {
    return new Document({ ...this.json(), components: data })
  }

  $securityRequirement<U extends string> (name: U, values: string[]): Document<T & { security: [...NonNullable<T['security']>, { [P in U]: string[] }] }> {
    const json = this.json()
    const security = [...(json.security ?? []), { [name]: values }] as [...NonNullable<T['security']>, { [P in U]: string[] }]
    return new Document({ ...json, security })
  }

  $tag<U extends TagObjectType> (data: U): Document<T & { tags: [...NonNullable<T['tags']>, U] }> {
    const json = this.json()
    const tags = [...(json.tags ?? []) ?? [], data] as [...NonNullable<T['tags']>, U]
    return new Document({ ...json, tags })
  }

  $externalDocs<U extends ExternalDocumentationObjectType> (data: U): Document<T & { externalDocs: U }> {
    return new Document({ ...this.json(), externalDocs: data })
  }
}
