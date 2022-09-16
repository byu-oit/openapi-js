import { Base, TypeCheckError } from '@byu-oit/openapi.common'
import { ContactObjectType, isContactObject } from './schema'

export class Contact<T extends ContactObjectType> extends Base implements ContactObjectType {
  name?: T['name']
  url?: T['url']
  email?: T['email']

  constructor (data?: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends ContactObjectType = ContactObjectType> (data: T): Contact<T> {
    const valid = Contact.validator.Check(data)
    if (!valid) throw new TypeCheckError(Contact.validator, data)
    return new Contact(data) 
  }

  static validator = isContactObject

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
