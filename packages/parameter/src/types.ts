import { ReferenceRecord, ToReference } from '@byu-oit/openapi.reference'
import { ParameterObjectType } from './schema'
import { Parameter } from './class'

export type ToParameter<T> = T extends ParameterObjectType ? Parameter<T> : never

export type ParameterRecord<T> = T extends ReferenceRecord<string, ParameterObjectType>
  ? { [P in keyof T]: ToReference<T[P]> | ToParameter<T[P]> }
  : never

export type ParameterCollection<T> = T extends Array<unknown>
  ? Array<ToReference<T[number]> | ToParameter<T[number]>>
  : never
