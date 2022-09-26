import { ServerObjectType } from './schema'
import { Server } from './class'

export type ServerCollection<T> = T extends ServerObjectType[]
  ? Array<Server<T[number]>>
  : never
