import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import { ContactObjectType, isContactObject } from './schema'

export class Contact<T extends ContactObjectType> extends BaseObject<T> {
  name?: T['name']
  url?: T['url']
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

  $url<U extends string> (url: U): Contact<T & { url: U }> {
    return new Contact({ ...this.json(), url })
  }

  $email<U extends string> (email: U): Contact<T & { email: U }> {
    return new Contact({ ...this.json(), email })
  }
}
