import { TagObjectType } from './schema'
import { Tag } from './class'

export type TagCollection<T> = T extends TagObjectType[]
  ? Array<Tag<T[number]>>
  : never
