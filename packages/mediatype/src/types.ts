import { MediaType } from './class'
import { MediaTypeObjectType } from './schema'

export type ToMediaType<T> = T extends MediaTypeObjectType ? MediaType<T> : never

export type MediaTypeRecord<T> = { [P in keyof T]: ToMediaType<T[P]> }
