import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { ExampleObjectType } from './schema'
import { Example } from './class'

export type ToExample<T> = T extends ExampleObjectType ? Example<T> : never

export type ExampleRecord<T> = T extends ReferenceRecord<string, ExampleObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToExample<T[P]> }
  : never
