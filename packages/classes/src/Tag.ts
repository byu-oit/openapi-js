import * as S from '@byu-oit/openapi-schemas'
import { ExternalDocumentation } from './ExternalDocumentation'
import { Base } from './Base'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { TypeCheckError } from './util'

export class Tag<T extends S.Tag> extends Base implements S.Tag {
  name!: T['name']
  description?: string
  externalDoc?: T['externalDoc']

  constructor (data: T)
  constructor (name: T['name'], data?: Omit<T, 'name'>)
  constructor (value: T['name'] | T, data?: Omit<T, 'name'>) {
    super()
    const tag = typeof value === 'string' ? { ...data, name: value } : value
    Object.assign(this, tag)
  }

  static from<T extends S.Tag = S.Tag> (data: unknown): Tag<T> {
    const valid = Tag.validator.Check(data)
    if (!valid) throw new TypeCheckError(Tag.validator, data)
    return new Tag(data) as Tag<T>
  }

  static validator = TypeCompiler.Compile(S.TTag)

  $name<U extends string> (name: U): Tag<T & { name: U }> {
    return new Tag({ ...this.json(), name })
  }

  $description (description: string): Tag<T> {
    return new Tag({ ...this.json(), description })
  }

  $externalDoc<U extends S.ExternalDocumentation>(data: U): Tag<T & { externalDoc: U }> {
    const externalDoc = new ExternalDocumentation(data)
    return new Tag({ ...this.json(), externalDoc })
  }
}
