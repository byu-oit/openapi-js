import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { PathItemObjectType } from './schema'
import { PathItem } from './class'

export type ToPathItem<T> = T extends PathItemObjectType ? PathItem<T> : never

export type PathItemRecord<T> = T extends ReferenceRecord<string, PathItemObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToPathItem<T[P]> }
  : never
