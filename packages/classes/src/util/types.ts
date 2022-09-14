import { TSchema, Kind } from '@sinclair/typebox'

export type Push<T extends ReadonlyArray<any> | undefined, U>
  = T extends ReadonlyArray<any>
  ? U extends ReadonlyArray<any>
    ? [...T, ...U]
    : [...T, U]
  : U extends ReadonlyArray<any>
    ? U
    : [U]

export type Merge<T, U>
  = T extends {[P in keyof T]: T[P] }
  ? U extends { [P in keyof U]: U[P] }
    ? { [P in keyof T]: T[P] } & { [P in keyof U]: U[P] }
    : { [P in keyof T]: T[P] }
  : { [P in keyof U]: U[P] }

export function isTSchema (value: unknown): value is TSchema {
  return value != null && typeof value === 'object' && Object.hasOwnProperty.call(value, Kind)
}
