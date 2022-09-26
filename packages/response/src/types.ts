import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { ResponseObjectType } from './schema'
import { Response } from './class'

export type ToResponse<T> = T extends ResponseObjectType ? Response<T> : never

export type ResponseRecord<T> = T extends ReferenceRecord<string, ResponseObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToResponse<T[P]> }
  : never
