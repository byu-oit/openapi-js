import { ReferenceObjectType } from './schema'
import { Reference } from './class'

export type ToReference<T> = T extends ReferenceObjectType ? Reference : never

export type ReferenceRecord<K extends string | number | symbol, T> = Record<K, T | ReferenceObjectType>
