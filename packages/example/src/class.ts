import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { ExampleObjectType, isExampleObject } from './schema'


/**
 * Source: https://spec.openapis.org/oas/latest.html#example-object
 */
export class Example<T extends ExampleObjectType> extends BaseObject<T> {

  /**
   * Short description for the example.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-15
   */
  summary?: T['summary']

  /**
   * Long description for the example. (CommonMark syntax)[https://spec.commonmark.org/] MAY be used for rich text representation.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-15
   */
  description?: T['description']

  /**
   * Embedded literal example. The value field and externalValue field are mutually exclusive. 
   * To represent examples of media types that cannot naturally represented in JSON or YAML, use a string value to contain the example, escaping where necessary.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-15
   */
  value?: T['value']

  /**
   * A URI that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents. 
   * The value field and externalValue field are mutually exclusive. See the rules for resolving (Relative References)[https://spec.openapis.org/oas/latest.html#relativeReferencesURI].
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-15
   */
  externalValue?: T['externalValue']

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.summary != null) {
      this.summary = data.summary
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.value != null) {
      this.value = data.value
    }

    if (data.externalValue != null) {
      this.externalValue = data.externalValue
    }
  }

  static from<T extends ExampleObjectType = ExampleObjectType> (data: unknown): Example<T> {
    const valid = Example.validator.Check(data)
    if (!valid) throw new TypeCheckError(Example.validator, data)
    return new Example(data) as Example<T>
  }

  static validator = isExampleObject

  /**
   * Creates a copy of the instance with the summary property added.
   * 
   * @template T, U
   * @param {U} summary The summary to be added to the example object.
   * @returns {Example<T & { summary: U }>}
   */
  $summary<U extends string>(summary: U): Example<T & { summary: U }> {
    return new Example({ ...this.json(), summary })
  }

  /**
   * Creates a copy of the instance with the description property added.
   * 
   * @template T, U
   * @param {U} description The description to be added to the example object.
   * @returns  {Example<T & { description: U }>}
   */
  $description<U extends string>(description: U): Example<T & { description: U }> {
    return new Example({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the value property added.
   * 
   * @template T, U
   * @param {U} value The value to be added to the example object. 
   * @returns {Example<T & { value: U }>}
   */
  $value<U>(value: U): Example<T & { value: U }> {
    return new Example({ ...this.json(), value })
  }

  /**
   * Creates a copy of the instance with the externalValue property added.
   * 
   * @template T, U
   * @param {U} externalValue 
   * @returns {Example<T & { externalValue: U }>}
   */
  $externalValue<U extends string>(externalValue: U): Example<T & { externalValue: U }> {
    return new Example({ ...this.json(), externalValue })
  }
}
