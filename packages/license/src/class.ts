import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { isLicenseObject, LicenseObjectType } from './schema'


/**
 * License information for the exposed API.
 * 
 * Source: https://spec.openapis.org/oas/latest#license-object
 */
export class License<T extends LicenseObjectType> extends BaseObject<T> {

  /**
   * REQUIRED. The license name used for the API.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-2
   */
  name: T['name']

  /**
   * An (SPDX)[https://spdx.org/spdx-specification-21-web-version#h.jxpfx0ykyb60] license expression for the API. The identifier field is mutually exclusive of the url field.
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-2
   */
  identifier?: T['identifier']

  /**
   * A URL to the license used for the API. This MUST be in the form of a URL. The url field is mutually exclusive of the identifier field
   * 
   * Source: https://spec.openapis.org/oas/latest#fixed-fields-2
   */
  url?: T['url']

  constructor (data: T) {
    super()

    this.name = data.name

    if (data.identifier != null) {
      this.identifier = data.identifier
    }

    if (data.url != null) {
      this.url = data.url
    }
  }

  static from<T extends LicenseObjectType>(data: LicenseObjectType): License<T> {
    const valid = License.validator.Check(data)
    if (!valid) throw new TypeCheckError(License.validator, data)
    return new License(data) as License<T>
  }

  static validator = isLicenseObject

  /**
   * Creates a copy of the instance with the name property added.
   * 
   * @template T, U
   * @param {U} name The name to be added to the license object.
   * @returns {License<T & { name: U }>}
   */
  $name<U extends string>(name: U): License<T & { name: U }> {
    return new License({ ...this.json(), name })
  }

  /**
   * Creates a copy of the instance with the identifier property added.
   * 
   * @template T, U
   * @param {U} identifier The identifier to be added to the license object.
   * @returns  {License<T & { identifier: U }>}
   */
  $identifier<U extends string>(identifier: U): License<T & { identifier: U }> {
    return new License({ ...this.json(), identifier })
  }

  /**
   * Creates a copy of the instance with the url property added.
   * 
   * @template T, U
   * @param {U} url The url to be added to the license object. 
   * @returns {License<T & { url: U }>}
   */
  $url<U extends string>(url: U): License<T & { url: U }> {
    return new License({ ...this.json(), url })
  }
}
