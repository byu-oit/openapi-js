import { EncodingObjectType } from './schema'
import { Encoding } from './class'

export type ToEncoding<T> = T extends EncodingObjectType ? Encoding<T> : never

export type EncodingRecord<T> = T extends Record<string, EncodingObjectType>
  ? { [P in keyof T]: ToEncoding<T> }
  : never
