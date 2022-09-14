import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { Header } from './Header'
import { Merge, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class Encoding<T extends S.Encoding> extends Base implements S.Encoding {
  contentType?: T['contentType']
  headers?: T['headers']
  style?: T['style']
  explode?: T['explode']
  allowReserved?: T['allowReserved']

  constructor (data?: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.Encoding = S.Encoding> (data: unknown): Encoding<T> {
    const valid = Encoding.validator.Check(data)
    if (!valid) throw new TypeCheckError(Encoding.validator, data)
    return new Encoding(data) as Encoding<T>
  }

  static validator = TypeCompiler.Compile(S.TEncoding)

  $contentType<U extends string> (contentType: U): Encoding<T & { contentType: U }> {
    return new Encoding({ ...this.json(), contentType })
  }

  $header<U extends string, V extends S.Header>(name: U, data: V): Encoding<{ headers: Merge<T['headers'], { [P in U]: Header<V> }> }> {
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
