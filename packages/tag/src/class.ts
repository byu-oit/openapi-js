import { Base, TypeCheckError } from '@byu-oit/openapi.common'
import {
  ExternalDocumentation,
  ExternalDocumentationObjectType
} from '@byu-oit/openapi.externaldocumentation'
import { isTagObject, TagObjectType } from './schema'

export class Tag<T extends TagObjectType> extends Base implements TagObjectType {
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

  static from<T extends TagObjectType = TagObjectType> (data: unknown): Tag<T> {
    const valid = Tag.validator.Check(data)
    if (!valid) throw new TypeCheckError(Tag.validator, data)
    return new Tag(data) as Tag<T>
  }

  static validator = isTagObject

  $name<U extends string> (name: U): Tag<T & { name: U }> {
    return new Tag({ ...this.json(), name })
  }

  $description (description: string): Tag<T> {
    return new Tag({ ...this.json(), description })
  }

  $externalDoc<U extends ExternalDocumentationObjectType>(data: U): Tag<T & { externalDoc: U }> {
    const externalDoc = new ExternalDocumentation(data)
    return new Tag({ ...this.json(), externalDoc })
  }
}
