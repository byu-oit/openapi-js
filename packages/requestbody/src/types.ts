import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { RequestBodyObjectType } from './schema'
import { RequestBody } from './class'

export type ToRequestBody<T> = T extends RequestBodyObjectType ? RequestBody<T> : never

export type RequestBodyRecord<T> = T extends ReferenceRecord<string, RequestBodyObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToRequestBody<T[P]> }
  : never
