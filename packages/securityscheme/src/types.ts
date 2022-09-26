import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { SecuritySchemeObjectType } from './schema'
import { SecurityScheme } from './class'

export type ToSecurityScheme<T> = T extends SecuritySchemeObjectType ? SecurityScheme<T> : never

export type SecuritySchemeRecord<T> = T extends ReferenceRecord<string, SecuritySchemeObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToSecurityScheme<T[P]> }
  : never
