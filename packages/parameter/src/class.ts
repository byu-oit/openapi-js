import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Example, ExampleObjectType, ExampleRecord } from '@byu-oit/openapi.example'
import {
  ParameterObjectType,
  ParameterLocationType,
  ParameterStyleType,
  isParameterObject
} from './schema'
import { isReferenceObject, Reference } from '@byu-oit/openapi.reference'

/**
 * Describes a single operation parameter.
 * A unique parameter is defined by a combination of a (name)[https://spec.openapis.org/oas/latest#parameterName] and (location)[https://spec.openapis.org/oas/latest#parameterIn].
 * 
 * {@link https://spec.openapis.org/oas/latest#parameter-object}
 */
export class Parameter<T extends ParameterObjectType> extends BaseObject<T> {

  /**
   * 	REQUIRED. The name of the parameter. Parameter names are case sensitive.
   * If in is "path", the name field MUST correspond to a template expression occurring within the (path)[https://spec.openapis.org/oas/latest#pathsPath] field in the (Paths Object)[https://spec.openapis.org/oas/latest#pathsObject]. See (Path Templating)[https://spec.openapis.org/oas/latest#pathTemplating] for further information.
   * If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the parameter definition SHALL be ignored.
   *   or all other cases, the name corresponds to the parameter name used by the in property.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  name: T['name']
  
  /**
   * REQUIRED. The location of the parameter. Possible values are "query", "header", "path" or "cookie".
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  in: T['in']
  
  /**
   * A brief description of the parameter. This could contain examples of use. (CommonMark syntax)[https://spec.commonmark.org/] MAY be used for rich text representation.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  description?: T['description']
  
  /**
   * Determines whether this parameter is mandatory. If the (parameter location)[https://spec.openapis.org/oas/latest#parameterIn] is "path", this property is REQUIRED and its value MUST be true. Otherwise, the property MAY be included and its default value is false.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  required?: T['required']
  
  /**
   * Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  deprecated?: T['deprecated']
  
  /**
   * Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value. Default value is false. If style is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  allowEmptyValue?: T['allowEmptyValue']
  
  /**
   * Describes how the parameter value will be serialized depending on the type of the parameter value. Default values (based on value of in): for query - form; for path - simple; for header - simple; for cookie - form. 
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  style?: T['style']
  
  /**
   * When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map. For other types of parameters this property has no effect. When style is form, the default value is true. For all other styles, the default value is false.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  explode?: T['explode']
  
  /**
   * Determines whether the parameter value SHOULD allow reserved characters, as defined by [RFC3986] :/?#[]@!$&'()*+,;= to be included without percent-encoding. This property only applies to parameters with an in value of query. The default value is false.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  allowReserved?: T['allowReserved']
  
  /**
   * The schema defining the type used for the parameter.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  schema?: T['schema']
  
  /**
   * Example of the parameter’s potential value. The example SHOULD match the specified schema and encoding properties if present. 
   * The example field is mutually exclusive of the examples field. Furthermore, if referencing a schema that contains an example, the example value SHALL override the example provided by the schema. 
   * To represent examples of media types that cannot naturally be represented in JSON or YAML, a string value can contain the example with escaping where necessary.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  example?: T['example']
  
  /**
   * Examples of the parameter’s potential value. Each example SHOULD contain a value in the correct format as specified in the parameter encoding. The examples field is mutually exclusive of the example field. Furthermore, if referencing a schema that contains an example, the examples value SHALL override the example provided by the schema.
   * 
   * {@link https://spec.openapis.org/oas/latest#parameter-locations}
   */
  examples?: ExampleRecord<T['examples']>

  constructor (data: T) {
    super()

    this.name = data.name

    this.in = data.in

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

  static from<T extends ParameterObjectType = ParameterObjectType> (data: unknown): Parameter<T> {
    const valid = Parameter.validator.Check(data)
    if (!valid) throw new TypeCheckError(Parameter.validator, data)
    return new Parameter(data) as Parameter<T>
  }

  static validator = isParameterObject

  /**
   * Creates a copy of the instance with the parameter query object added.
   * 
   * @template T
   * @param {T} data Data to add to the object.
   * @returns {Parameter<T & { in: 'query' }>}
   */
  static query<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'query' }> {
    return new Parameter<T & { in: 'query' }>({ ...data, in: 'query' })
  }

  /**
   * Creates a copy of the instance with the parameter header property added.
   * 
   * @template T
   * @param {T} data Data added to the object.
   * @returns {Parameter<T & { in: 'header' }>}
   */
  static header<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'header' }> {
    return new Parameter({ ...data, in: 'header' })
  }

  /**
   * Creates a copy of the instance with the parameter path property added.
   * 
   * @template T
   * @param {T} data Data added to the object.
   * @returns {Parameter<T & { in: 'path' }>}
   */
  static path<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'path' }> {
    return new Parameter({ ...data, in: 'path' })
  }

  /**
   * Creates a copy of the instance with the parameter cookie property added.
   * 
   * @template T
   * @param {T} data Data added to the object.
   * @returns {Parameter<T & { in: 'cookie' }>}
   */
  static cookie<T extends Omit<ParameterObjectType, 'in'>> (data: T): Parameter<T & { in: 'cookie' }> {
    return new Parameter({ ...data, in: 'cookie' })
  }

  /**
   * Creates a copy of the instance with the name added.
   * 
   * @template T, U
   * @param {U} name Name to be added to the object. 
   * @returns {Parameter<T & { name: U }>}
   */
  $name<U extends string = string> (name: U): Parameter<T & { name: U }> {
    return new Parameter<T & { name: U }>({ ...this.json(), name })
  }

  /**
   * Creates a copy of the instance with the in added.
   * 
   * @template T, L
   * @param {L} location Location to be added to the object.
   * @returns {Parameter<T & { in: L }>}
   */
  $in<L extends ParameterLocationType = ParameterLocationType> (location: L): Parameter<T & { in: L }> {
    return new Parameter({ ...this.json(), in: location })
  }

  /**
   * Creates a copy of the instance with the description added.
   * 
   * @template T
   * @param {string} description Description to be added to the object. 
   * @returns {Parameter<T>}
   */
  $description (description: string): Parameter<T> {
    return new Parameter({ ...this.json(), description })
  }

  /**
   * Creates a copy of the instance with the required added.
   * 
   * @template T, U
   * @param {U} required Required property to be added to the object.
   * @returns {Parameter<T & { required: U }>}
   */
  $required<U extends boolean = boolean> (required: U): Parameter<T & { required: U }> {
    return new Parameter({ ...this.json(), required })
  }

  /**
   * Creates a copy of the instance with the deprecated added.
   * 
   * @template T, U
   * @param {U} deprecated Deprecated property to be added to the object.
   * @returns {Parameter<T & { deprecated: U }>}
   */
  $deprecated<U extends boolean = boolean> (deprecated: U): Parameter<T & { deprecated: U }> {
    return new Parameter({ ...this.json(), deprecated })
  }

  /**
   * Creates a copy of the instance with the deprecated added.
   * 
   * @template T, U
   * @param {U} allowEmptyValue AllowEmptyValue property added to the object.
   * @returns {Parameter<T & { allowEmptyValue: U }>}
   */
  $allowEmptyValue<U extends boolean = boolean> (allowEmptyValue: U): Parameter<T & { allowEmptyValue: U }> {
    return new Parameter({ ...this.json(), allowEmptyValue })
  }

  /**
   * Creates a copy of the instance wth the style property added.
   * 
   * @template T, U
   * @param {U} style Style to be added to the object.
   * @returns  {Parameter<T & { style: U }>}
   */
  $style<U extends ParameterStyleType = ParameterStyleType> (style: U): Parameter<T & { style: U }> {
    return new Parameter({ ...this.json(), style })
  }

  /**
   * Creates a copy of the instance with the explode added.
   * 
   * @template T, U
   * @param {U} explode Explode property to be added to the object.
   * @returns  {Parameter<T & { explode: U }>}
   */
  $explode<U extends boolean = boolean> (explode: U): Parameter<T & { explode: U }> {
    return new Parameter({ ...this.json(), explode })
  }

  /**
   * Creates a copy of the instance with the allowReserved added.
   * 
   * @template T, U
   * @param {U} allowReserved AllowReserved property to be added to the object.
   * @returns {Parameter<T & { allowReserved: U }>}
   */
  $allowReserved<U extends boolean = boolean> (allowReserved: U): Parameter<T & { allowReserved: U }> {
    return new Parameter({ ...this.json(), allowReserved })
  }

  /**
   * Creates a copy of the instance with the example added.
   *  
   * @template T, U, V, P
   * @param {U} name Name to be added to the object.
   * @param {V} data Data to be added to the object.
   * @returns {Parameter<T & { examples: T['examples'] & { [P in U]: V } }>}
   */
  $example<U extends string, V extends ExampleObjectType>(name: U, data?: V): Parameter<T & { examples: T['examples'] & { [P in U]: V } }> {
    const json = this.json()
    const examples = { ...(json.examples ?? []), [name]: data } as T['examples'] & { [P in U]: V }
    return new Parameter({ ...json, examples })
  }
}
