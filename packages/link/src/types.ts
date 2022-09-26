import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { LinkObjectType } from './schema'
import { Link } from './class'

export type ToLink<T> = T extends LinkObjectType ? Link<T> : never

export type LinkRecord<T> = T extends ReferenceRecord<string, LinkObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToLink<T[P]> }
  : never
