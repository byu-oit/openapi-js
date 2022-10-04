import {
  BaseObject,
  InvalidReferenceError,
  UnsupportedReferenceError
} from '@byu-oit/openapi.common'
import get from 'lodash.get'
import { ReferenceObjectType } from './schema'

export class Reference<T extends ReferenceObjectType = ReferenceObjectType> extends BaseObject<T> {
  private readonly root?: unknown
  /**
   * REQUIRED. The reference identifier. This MUST be in the form of a URI.
   *
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-18}
   */
  $ref: T['$ref']

  /**
   * A short summary which by default SHOULD override that of the referenced
   * component. If the referenced object-type does not allow a summary field, then
   * this field has no effect.
   *
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-18}
   */
  summary?: T['summary']

  /**
   * A description which by default SHOULD override that of the referenced component.
   * CommonMark syntax MAY be used for rich text representation. If the referenced
   * object-type does not allow a description field, then this field has no effect.
   *
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-18}
   */
  description?: T['description']

  constructor (data: T, root?: unknown) {
    super()

    if (!data.$ref.startsWith('#/')) {
      // Only internal references are supported
      throw new UnsupportedReferenceError(data.$ref)
    }

    if (root != null) {
      this.root = root
    }

    this.$ref = data.$ref

    if (data.summary != null) {
      this.summary = data.summary
    }

    if (data.description != null) {
      this.description = data.description
    }
  }

  /**
   * Creates a copy of the instance with the $ref property added.
   *
   * @template T, U
   * @param {U} ref
   * @returns {Reference<T & { $ref: U }>}
   */
  $reference<U extends string> (ref: U): Reference<T & { $ref: U }> {
    return new Reference({ ...this.json(), $ref: ref }, this.root)
  }

  /**
   * Creates a copy of the instance with the summary added.
   *
   * @template T, U
   * @param {U} summary
   * @returns {Reference<T & { summary: U }>}
   */
  $summary<U extends string> (summary: U): Reference<T & { summary: U }> {
    return new Reference({ ...this.json(), summary }, this.root)
  }

  /**
   * Creates a copy of the instance with the description added.
   *
   * @template T, U
   * @param {U} description
   * @returns {Reference<T & { description: U }>}
   */
  $description<U extends string> (description: U): Reference<T & { description: U }> {
    return new Reference({ ...this.json(), description }, this.root)
  }

  /**
   * Dereferences this current object relative to the root of the document
   *
   * @param {unknown} [root]
   * @returns {unknown} The object located at the $ref location.
   */
  $dereference(root?: unknown): unknown {
    root = root ?? this.root

    if (root == null) {
      // Cannot dereference without a root
      throw Error('No root to dereference against')
    }

    // Removes the '#/' prefix and split by '/'
    const path = this.$ref.substring(2).split('/')

    // Attempts to find the data using the reference path
    const data = get(root, path) as unknown
    if (data == null) {
      // The reference was invalid
      throw new InvalidReferenceError(this.$ref)
    }

    // Return the raw dereferenced data
    return data
  }
}
