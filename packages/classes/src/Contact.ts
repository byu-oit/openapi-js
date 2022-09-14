import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class Contact<T extends S.Contact> extends Base implements S.Contact {
  name?: T['name']
  url?: T['url']
  email?: T['email']

  constructor (data?: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.Contact = S.Contact> (data: T): Contact<T> {
    const valid = Contact.validator.Check(data)
    if (!valid) throw new TypeCheckError(Contact.validator, data)
    return new Contact(data) as Contact<T>
  }

  static validator = TypeCompiler.Compile(S.TContact)

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
