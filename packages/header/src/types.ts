import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { HeaderObjectType } from './schema'
import { Header } from './class'

export type ToHeader<T> = T extends HeaderObjectType ? Header<T> : never

export type HeaderRecord<T> = T extends ReferenceRecord<string, HeaderObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToHeader<T[P]> }
  : never
