import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { Contact, ContactObjectType } from '@byu-oit/openapi.contact'
import { License, LicenseObjectType } from '@byu-oit/openapi.license'
import { InfoObjectType, isInfoObject } from './schema'


/**
 * The object provides metadata about the API. The metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.
 *
 * {@link https://spec.openapis.org/oas/latest#info-object}
 */
export class Info<T extends InfoObjectType> extends BaseObject<T> {

  /**
   * REQUIRED. The title of the API.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-0}
   */
  title: T['title']
  
  /**
   * A short summary of the API.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-0}
   */
  summary?: T['summary']
  
  /**
   * A description of the API. (CommonMark syntax)[https://spec.commonmark.org/] MAY be used for rich text representation.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-0}
   */
  description?: T['description']
  
  /**
   * A URL to the Terms of Service for the API. This MUST be in the form of a URL.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-0}
   */
  termsOfService?: T['termsOfService']
  
  /**
   * The contact information for the exposed API.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-0}
   */
  contact?: Contact<NonNullable<T['contact']>>
  
  /**
   * The license information for the exposed API.
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-0}
   */
  license?: License<NonNullable<T['license']>>
  
  /**
   * REQUIRED. The version of the OpenAPI document (which is distinct from the (OpenAPI Specification version)[https://spec.openapis.org/oas/latest#oasVersion] or the API implementation version).
   * 
   * {@link https://spec.openapis.org/oas/latest#fixed-fields-0}
   */
  version: T['version']

  constructor (data: T) {
    super()

    this.title = data.title

    if (data.summary != null) {
      this.summary = data.summary
    }

    if (data.description != null) {
      this.description = data.description
    }

    if (data.termsOfService != null) {
      this.termsOfService = data.termsOfService
    }

    if (data.contact != null) {
      this.contact = new Contact(data.contact)
    }

    if (data.license != null) {
      this.license = new License(data.license)
    }

    this.version = data.version
  }

  static from<T extends InfoObjectType = InfoObjectType> (data: unknown): Info<T> {
    const valid = Info.validator.Check(data)
    if (!valid) throw new TypeCheckError(Info.validator, data)
    return new Info(data) as Info<T>
  }

  static validator = isInfoObject


  /**
   * Creates a copy of the instance with the title added.
   * 
   * @template T, U
   * @param {U} title The title to be added to the info object. 
   * @returns {Info<T & { title: U }>}
   */
  $title<U extends string> (title: U): Info<T & { title: U }> {
    return new Info({ ...this.json(), title: title })
  }

  /**
   * Creates a copy of the instance with the summary added.
   * 
   * @template T
   * @param {string} text The text to be added to the info object.
   * @returns {Info<T>}
   */
  $summary (text: string): Info<T> {
    return new Info({ ...this.json(), summary: text })
  }

  /**
   * Creates a copy of the instance with the description added.
   * 
   * @template T
   * @param {string} text The text to be added to the info object.
   * @returns {Info<T>}
   */
  $description (text: string): Info<T> {
    return new Info({ ...this.json(), description: text })
  }

  /**
   * Creates a copy of the instance with the description added.
   * 
   * @template T
   * @param {string} text The text to be added to the info object. 
   * @returns {Info<T>}
   */
  $termsOfService (text: string): Info<T> {
    return new Info({ ...this.json(), termsOfService: text })
  }

  /**
   * Creates a copy of the instance with the contact added.
   * 
   * @template T, U
   * @param {U} data The data to be added to the info object. 
   * @returns {Info<T & { contact: U }>}
   */
  $contact<U extends ContactObjectType> (data: U): Info<T & { contact: U }> {
    return new Info({ ...this.json(), contact: data })
  }

  /**
   * Creates a copy of the instance with the license added.
   * 
   * @template T, U
   * @param {U} data The data to be added to the info object.
   * @returns {Info<T & { license: U }>}
   */
  $license<U extends LicenseObjectType> (data: U): Info<T & { license: U }> {
    return new Info({ ...this.json(), license: data })
  }

  /**
   * Creates a copy of the instance with the license added.
   * 
   * @template T, U
   * @param {U} version The version to be added to the info object.
   * @returns {Info<T & { version: U }>}
   */
  $version<U extends string> (version: U): Info<T & { version: U }> {
    return new Info({ ...this.json(), version: version })
  }
}
