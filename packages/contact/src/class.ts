import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { ContactObjectType, isContactObject } from './schema'



/**
 * Contact information for the exposed API.
 * 
 * Source: https://spec.openapis.org/oas/latest.html#contact-object
 */
export class Contact<T extends ContactObjectType> extends BaseObject<T> {
  /**
   * The identifying name of the contact person/organization.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-1
   */
  name?: T['name']

  /**
   * The URL pointing to the contact information. This MUST be in the form of a URL.
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-1
   */
  url?: T['url']

  /**
   * The email address of the contact person/organization. This MUST be in the form of an email address.   * 
   * 
   * Source: https://spec.openapis.org/oas/latest.html#fixed-fields-1
   */
  email?: T['email']

  constructor (data?: T) {
    super()

    if (data == null) {
      return
    }

    if (data.name != null) {
      this.name = data.name
    }

    if (data.url != null) {
      this.url = data.url
    }

    if (data.email != null) {
      this.email = data.email
    }
  }

  static from<T extends ContactObjectType = ContactObjectType> (data: T): Contact<T> {
    const valid = Contact.validator.Check(data)
    if (!valid) throw new TypeCheckError(Contact.validator, data)
    return new Contact(data)
  }

  static validator = isContactObject

  /**
   * Creates a copy of the instance with the name property added.
   *
   * @template T, U
   * @param {U} name The name to add to the contact object.
   * @returns {Contact<T & { name: U }}
   */
  $name<U extends string> (name: U): Contact<T & { name: U }> {
    return new Contact({ ...this.json(), name })
  }

  /**
   * Creates a copy of the instance with the url property added.
   * 
   * @template T, U
   * @param {U} url The url to add to the contact object.
   * @returns {Contact<T & { url: U }>}
   */
  $url<U extends string> (url: U): Contact<T & { url: U }> {
    return new Contact({ ...this.json(), url })
  }

  /**
   * Creates a copy of the instance with email property added.
   * 
   * @template T, U
   * @param {U} email The email to add to the contact object.
   * @returns {Contact<T & { email: U }>}
   */
  $email<U extends string> (email: U): Contact<T & { email: U }> {
    return new Contact({ ...this.json(), email })
  }
}
