import { BaseObject, TypeCheckError } from '@byu-oit/openapi.common'
import {
  ExternalDocumentation,
  ExternalDocumentationObjectType
} from '@byu-oit/openapi.externaldocumentation'
import { isTagObject, TagObjectType } from './schema'

export class Tag<T extends TagObjectType> extends BaseObject<T> {
  name: T['name']
  description?: T['description']
  externalDoc?: ExternalDocumentation<NonNullable<T['externalDoc']>>

  constructor (data: T) {
    super()

    this.name = data.name

    if (data.description != null) {
      this.description = data.description
    }

    if (data.externalDoc != null) {
      this.externalDoc = new ExternalDocumentation(data.externalDoc)
    }
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

  $description<U extends string> (description: U): Tag<T & { description: U }> {
    return new Tag({ ...this.json(), description })
  }

  $externalDoc<U extends ExternalDocumentationObjectType> (data: U): Tag<T & { externalDoc: U }> {
    return new Tag({ ...this.json(), externalDoc: data })
  }
}
