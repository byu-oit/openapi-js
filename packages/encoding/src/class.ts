import { Base, Merge, TypeCheckError } from '@byu-oit/openapi.common'
import { Header, HeaderObjectType } from '@byu-oit/openapi.header'
import { EncodingObjectType, isEncodingObject } from './schema'

export class Encoding<T extends EncodingObjectType> extends Base implements EncodingObjectType {
  contentType?: T['contentType']
  headers?: T['headers']
  style?: T['style']
  explode?: T['explode']
  allowReserved?: T['allowReserved']

  constructor (data?: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends EncodingObjectType = EncodingObjectType> (data: unknown): Encoding<T> {
    const valid = Encoding.validator.Check(data)
    if (!valid) throw new TypeCheckError(Encoding.validator, data)
    return new Encoding(data) as Encoding<T>
  }

  static validator = isEncodingObject

  $contentType<U extends string> (contentType: U): Encoding<T & { contentType: U }> {
    return new Encoding({ ...this.json(), contentType })
  }

  $header<U extends string, V extends HeaderObjectType>(name: U, data: V): Encoding<{ headers: Merge<T['headers'], { [P in U]: Header<V> }> }> {
    const headers = { ...this.headers, [name]: new Header(data) }
    return new Encoding({ ...this.json(), headers })
  }

  $style<U extends string>(style: U): Encoding<T & { style: U }> {
    return new Encoding({ ...this.json(), style })
  }

  $explode<U extends boolean> (explode: U): Encoding<T & { explode: U }> {
    return new Encoding({ ...this.json(), explode })
  }

  $allowReserved<U extends boolean> (allowReserved: U): Encoding<T & { allowReserved: U }> {
    return new Encoding({ ...this.json(), allowReserved })
  }
}
