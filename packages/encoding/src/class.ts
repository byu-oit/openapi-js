import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  Header,
  HeaderObjectType,
  HeaderRecord,
  isHeaderObject
} from '@byu-oit/openapi.header'
import { EncodingObjectType, isEncodingObject } from './schema'
import { Reference } from '@byu-oit/openapi.reference'

export class Encoding<T extends EncodingObjectType> extends BaseObject<T> {
  contentType?: T['contentType']
  headers?: HeaderRecord<T['headers']>
  style?: T['style']
  explode?: T['explode']
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

  $contentType<U extends string> (contentType: U): Encoding<T & { contentType: U }> {
    return new Encoding({ ...this.json(), contentType })
  }

  $header<U extends string, V extends HeaderObjectType>(name: U, data: V): Encoding<T & { headers: T['headers'] & { [P in U]: V } }> {
    const json = this.json()
    const headers = { ...(json.headers ?? []), [name]: data } as T['headers'] & { [P in U]: V }
    return new Encoding({ ...json, headers })
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
