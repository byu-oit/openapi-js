import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Example, ExampleObjectType, ExampleRecord } from '@byu-oit/openapi.example'
import { ParameterStyleType } from '@byu-oit/openapi.parameter'
import { SecuritySchemeObjectType } from '@byu-oit/openapi.securityscheme'
import { HeaderObjectType, isHeaderObject } from './schema'
import {
  isReferenceObject,
  Reference,
} from '@byu-oit/openapi.reference'


/**
 * The Header Object follows the structure of the (Parameter Object)[https://spec.openapis.org/oas/latest.html#parameterObject] with the following changes
 *  1. name MUST NOT be specified, it is given in the corresponding headers map.
 *  2. in MUST NOT be specified, it is implicitly in header.
 *  3. All traits that are affected by the location MUST be applicable to a location of header (for example, (style)[https://spec.openapis.org/oas/latest.html#parameterStyle]).
 *
 * {@link https://spec.openapis.org/oas/latest.html#header-object}
 */
export class Header<T extends HeaderObjectType> extends BaseObject<T> {

  /**
   * A brief description of the parameter. This could contain examples of use. (CommonMark syntax)[https://spec.commonmark.org/] MAY be used for rich text representation.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  description?: T['description']
  
  /**
   * Determines whether this parameter is mandatory. If the (parameter location)[https://spec.openapis.org/oas/latest.html#parameterIn] is "path", this property is REQUIRED and its value MUST be true. 
   * Otherwise, the property MAY be included and its default value is false
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  required?: T['required']
  
  /**
   * 	Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  deprecated?: T['deprecated']
  
  /**
   * Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value.
   * Default value is false. If (style)[https://spec.openapis.org/oas/latest.html#parameterStyle] is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. 
   * Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  allowEmptyValue?: T['allowEmptyValue']
  
  /**
   * Describes how the parameter value will be serialized depending on the type of the parameter value. Default values (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  style?: T['style']
  
  /**
   * When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map. 
   * For other types of parameters this property has no effect. When (style)[https://spec.openapis.org/oas/latest.html#parameterStyle] is form, the default value is true. For all other styles, the default value is false.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  explode?: T['explode']
  
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by ([RFC3986])[https://spec.openapis.org/oas/latest.html#bib-RFC3986] :/?#[]@!$&'()*+,;= to be included without percent-encoding. This property only applies to parameters with an in value of query. The default value is false.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  allowReserved?: T['allowReserved']
  
  /**
   * The schema defining the type used for the parameter.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  schema?: T['schema']
  
  /**
   * Example of the parameter’s potential value. The example SHOULD match the specified schema and encoding properties if present. The example field is mutually exclusive of the examples field. 
   * Furthermore, if referencing a schema that contains an example, the example value SHALL override the example provided by the schema. 
   * To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  example?: T['example']
  
  /**
   * Examples of the parameter’s potential value. Each example SHOULD contain a value in the correct format as specified in the parameter encoding. The examples field is mutually exclusive of the example field. 
   * Furthermore, if referencing a schema that contains an example, the examples value SHALL override the example provided by the schema.
   * 
   * {@link https://spec.openapis.org/oas/latest.html#fixed-fields-9}
   */
  examples?: ExampleRecord<T['examples']>

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.required != null) {
      this.required = data.required
    }

    if (data.deprecated != null) {
      this.deprecated = data.deprecated
    }

    if (data.allowEmptyValue != null) {
      this.allowEmptyValue = data.allowEmptyValue
    }

    if (data.style != null) {
      this.style = data.style
    }

    if (data.explode != null) {
      this.explode = data.explode
    }

    if (data.allowReserved != null) {
      this.allowReserved = data.allowReserved
    }

    if (data.schema != null) {
      this.schema = data.schema
    }

    if (data.example != null) {
      this.example = data.example
    }

    if (data.examples != null) {
      this.examples = Object.entries(data.examples).reduce((agg, [basename, data]) => {
        const example = isReferenceObject.Check(data) ? new Reference(data) : new Example(data)
        return { ...agg, [basename]: example }
      }, {} as ExampleRecord<T['examples']>)
    }
  }

  static from<T extends HeaderObjectType> (data: unknown): Header<T> {
    const valid = Header.validator.Check(data)
    if (!valid) throw new TypeCheckError(Header.validator, data)
    return new Header(data) as Header<T>
  }

  static validator = isHeaderObject

  /**
   * Creates a copy of the instance with the description added.
   * 
   * @template T, U
   * @param {U} description The description property to add to the header object.
   * @returns {Header<T>}
   */
  $description<U extends string>(description: U): Header<T> {
    return new Header({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the required added.
   * 
   * @template T, U
   * @param {U} required The required property to add to the header object.
   * @returns  {Header<T & { required: U }>}
   */
  $required<U extends boolean> (required: U): Header<T & { required: U }> {
    return new Header({ ...this.json(), required })
  }

  /**
   * Creates a copy of the instance with the depricated added.
   * 
   * @template T, U
   * @param {U} deprecated The depricated property to add to the header object.
   * @returns {Header<T & { deprecated: U }>}
   */
  $deprecated<U extends boolean> (deprecated: U): Header<T & { deprecated: U }> {
    return new Header({ ...this.json(), deprecated })
  }

  /**
   * Creates a copy of the instance with the allowEmptyValue added.
   * 
   * @template T, U
   * @param {U} allowEmptyValue The allowEmptyValue property to be added to the header object.
   * @returns {Header<T & { allowEmptyValue: U }>}
   */
  $allowEmptyValue<U extends boolean> (allowEmptyValue: U): Header<T & { allowEmptyValue: U }> {
    return new Header({ ...this.json(), allowEmptyValue })
  }

  /**
   * Creates a copy of the instance with the style added.
   * 
   * @template T, U
   * @param {U} style The style property to add to the header object.
   * @returns  {Header<T & { style: U }>}
   */
  $style<U extends ParameterStyleType> (style: U): Header<T & { style: U }> {
    return new Header({ ...this.json(), style })
  }

  /**
   * Creates a copy of the instance with the explode added.
   * 
   * @template T, U
   * @param {U} explode The explode property to add to the header object.
   * @returns {Header<T & { explode: U }>}
   */
  $explode<U extends boolean> (explode: U): Header<T & { explode: U }> {
    return new Header({ ...this.json(), explode })
  }

  /**
   * Creates a copy of the instance with the allowReserved added.
   *  
   * @template T, U
   * @param {U} allowReserved The allowReserved property to add to the header object.
   * @returns {Header<T & { allowReserved: U }>}
   */
  $allowReserved<U extends boolean> (allowReserved: U): Header<T & { allowReserved: U }> {
    return new Header({ ...this.json(), allowReserved })
  }

  /**
   * Creates a copy of the instance with the schema added.
   * 
   * @template T, U
   * @param {U} schema The schema property added to the header object.
   * @returns {Header<T & { schema: U }>}
   */
  $schema<U extends SecuritySchemeObjectType> (schema: U): Header<T & { schema: U }> {
    return new Header({ ...this.json(), schema })
  }

  /**
   * Creates a copy of the instance with the example added.
   * 
   * @template T, U, V, P
   * @param {U} name The name to be added to the header object.
   * @param {V} data The data to be added to the header object.
   * @returns { Header<T & { examples: T['examples'] & { [P in U]: V } }>}
   */
  $example<U extends string, V extends ExampleObjectType> (name: U, data?: V): Header<T & { examples: T['examples'] & { [P in U]: V } }> {
    const json = this.json()
    const examples = { ...(json.examples ?? []), [name]: data } as T['examples'] & { [P in U]: V }
    return new Header({ ...json, examples })
  }
}
