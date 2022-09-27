import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  Header,
  HeaderObjectType,
  HeaderRecord,
  isHeaderObject
} from '@byu-oit/openapi.header'
import { EncodingObjectType, isEncodingObject } from './schema'
import { Reference } from '@byu-oit/openapi.reference'

/**
 * A single encoding definition applied to a single schema property.
 * 
 * Source: https://spec.openapis.org/oas/latest.html#encoding-object
 */
export class Encoding<T extends EncodingObjectType> extends BaseObject<T> {
  /**
   * 	The Content-Type for encoding a specific property. Default value depends
   *  on the property type: for object - application/json;
   *  for array – the default is defined based on the inner type;
   *  for all other cases the default is application/octet-stream.
   *  The value can be a specific media type (e.g. application/json),
   *  a wildcard media type (e.g. image/*),
   *  or a comma-separated list of the two types.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-12
   */
  contentType?: T['contentType']

   /**
   * A map allowing additional information to be provided as headers, for example Content-Disposition.
   * Content-Type is described separately and SHALL be ignored in this section.
   * This property SHALL be ignored if the request body media type is not a multipart.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-12
   */
  headers?: HeaderRecord<T['headers']>

   /**
   * Describes how a specific property value will be serialized depending on its type. 
   * See (Parameter Object)[https://spec.openapis.org/oas/latest.html#parameterObject] for details on the style property. 
   * The behavior follows the same values as query parameters, including default values. 
   * This property SHALL be ignored if the request body media type is not application/x-www-form-urlencoded or multipart/form-data. 
   * If a value is explicitly defined, then the value of contentType (implicit or explicit) SHALL be ignored.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-12
   */
  style?: T['style']

  /**
   * When this is true, property values of type array or object generate separate parameters for each value of the array, or key-value-pair of the map.
   *  For other types of properties this property has no effect. 
   * When style is form, the default value is true. 
   * For all other styles, the default value is false. 
   * This property SHALL be ignored if the request body media type is not application/x-www-form-urlencoded or multipart/form-data. 
   * If a value is explicitly defined, then the value of contentType (implicit or explicit) SHALL be ignored. 
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-12
   */
  explode?: T['explode']

   /**
   * Determines whether the parameter value SHOULD allow reserved characters,
   *  as defined by [RFC3986] :/?#[]@!$&'()*+,;= to be included without percent-encoding. 
   * The default value is false. This property SHALL be ignored if the request body media type is not application/x-www-form-urlencoded or multipart/form-data.
   * If a value is explicitly defined, then the value of contentType (implicit or explicit) SHALL be ignored.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-12
   */
  allowReserved?: T['allowReserved']

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.contentType != null) {
      this.contentType = data.contentType
    }

    if (data.headers != null) {
      this.headers = Object.entries(data.headers).reduce((agg, [basename, data]) => {
        const header = isHeaderObject.Check(data) ? new Header(data) : new Reference(data)
        return { ...agg, [basename]: header }
      }, {} as HeaderRecord<T['headers']>)
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
  }

  static from<T extends EncodingObjectType = EncodingObjectType> (data: unknown): Encoding<T> {
    const valid = Encoding.validator.Check(data)
    if (!valid) throw new TypeCheckError(Encoding.validator, data)
    return new Encoding(data) as Encoding<T>
  }

  static validator = isEncodingObject

  /**
   * Creates a copy of the instance with the contentType property added.
   * 
   * @template T, U
   * @param {U} contentType The contentType to add to the Encoding object
   * @returns {Encoding<T & { contentType: U }>}
   */
  $contentType<U extends string> (contentType: U): Encoding<T & { contentType: U }> {
    return new Encoding({ ...this.json(), contentType })
  }

  /**
   * Creates a copy of the instance with the header property added.
   * 
   * @template T, U, V, P
   * @param {U} name The name to add to the property.
   * @param {V} data The data to add to the property.
   * @returns {Encoding<T & { headers: T['headers'] & { [P in U]: V } }>}
   */
  $header<U extends string, V extends HeaderObjectType>(name: U, data: V): Encoding<T & { headers: T['headers'] & { [P in U]: V } }> {
    const json = this.json()
    const headers = { ...(json.headers ?? []), [name]: data } as T['headers'] & { [P in U]: V }
    return new Encoding({ ...json, headers })
  }

  /**
   * Creates a copy of the instance with the style property added.
   * 
   * @template T, U
   * @param {U} style The style to be added to the Encoding object.
   * @returns {Encoding<T & { style: U }>}
   */
  $style<U extends string>(style: U): Encoding<T & { style: U }> {
    return new Encoding({ ...this.json(), style })
  }

  /**
   * Creates a copy of the instance with the explode property added.
   * 
   * @template T, U
   * @param {U} explode The explode variable to add to the Encoding object.
   * @returns  {Encoding<T & { explode: U }>}
   */
  $explode<U extends boolean> (explode: U): Encoding<T & { explode: U }> {
    return new Encoding({ ...this.json(), explode })
  }

  /**
   * Creates a copy of the instance with the allowReserved property added.
   * 
   * @template T, U
   * @param {U} allowReserved The allowReserved variable to be added.
   * @returns {Encoding<T & { allowReserved: U }>} 
   */
  $allowReserved<U extends boolean> (allowReserved: U): Encoding<T & { allowReserved: U }> {
    return new Encoding({ ...this.json(), allowReserved })
  }
}
