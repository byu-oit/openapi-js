import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  ExternalDocumentation,
  ExternalDocumentationObjectType
} from '@byu-oit/openapi.externaldocumentation'
import { isTagObject, TagObjectType } from './schema'

export class Tag<T extends TagObjectType> extends BaseObject<T> {
  /**
   * REQUIRED. The name of the tag.
   *
   * {@link https://spec.openapis.org/oas/latest.html#tag-object Tag Object}
   */
  name: T['name']

  /**
   * A description for the tag. CommonMark syntax MAY be used for rich text
   * representation.
   *
   * {@link https://spec.openapis.org/oas/latest.html#tag-object Tag Object}
   */
  description?: T['description']

  /**
   * Additional external documentation for this tag.
   *
   * {@link https://spec.openapis.org/oas/latest.html#tag-object Tag Object}
   */
  externalDoc?: ExternalDocumentation<NonNullable<T['externalDoc']>>

  constructor (data: T) {
    super()

    this.name = data.name

    if (data.description != null) {
      this.description = data.description
    }

    if (data.externalDoc != null) {
      this.externalDoc = new ExternalDocumentation(data.externalDoc)
    }
  }

  static from<T extends TagObjectType = TagObjectType> (data: unknown): Tag<T> {
    const valid = Tag.validator.Check(data)
    if (!valid) throw new TypeCheckError(Tag.validator, data)
    return new Tag(data) as Tag<T>
  }

  static validator = isTagObject

  /**
   * Creates a copy of the instance with the name added.
   *
   * @template T, U
   * @param {U} name
   * @returns {Tag<T & { name: U }>}
   */
  $name<U extends string> (name: U): Tag<T & { name: U }> {
    return new Tag({ ...this.json(), name })
  }

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {Tag<T & { description: U }>}
   */
  $description<U extends string> (description: U): Tag<T & { description: U }> {
    return new Tag({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the externalDoc added.
   *
   * @template T, U
   * @param {U} data
   * @returns {Tag<T & { externalDoc: U }>}
   */
  $externalDoc<U extends ExternalDocumentationObjectType> (data: U): Tag<T & { externalDoc: U }> {
    return new Tag({ ...this.json(), externalDoc: data })
  }
}
