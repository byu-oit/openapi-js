import * as S from '@byu-oit/openapi-schemas'
import { Base } from './Base'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class ExternalDocumentation<T extends S.ExternalDocumentation> extends Base implements S.ExternalDocumentation {
  url!: T['url']
  description?: string

  constructor (data: T) {
    super()
    Object.assign(this, data)
  }

  static from<T extends S.ExternalDocumentation = S.ExternalDocumentation> (data: unknown): ExternalDocumentation<T> {
    const valid = ExternalDocumentation.validator.Check(data)
    if (!valid) throw new TypeCheckError(ExternalDocumentation.validator, data)
    return new ExternalDocumentation(data) as ExternalDocumentation<T>
  }

  static validator = TypeCompiler.Compile(S.TExternalDocumentation)

  $url<U extends string>(url: U): ExternalDocumentation<T & { url: U }> {
    return new ExternalDocumentation({ ...this.json(), url })
  }

  $description (description: string): ExternalDocumentation<T> {
    return new ExternalDocumentation({ ...this.json(), description })
  }
}
