import { ServerVariableObjectType } from './schema'
import { ServerVariable } from './class'

export type ToSeverVariable<T> = T extends ServerVariableObjectType ? ServerVariable<T> : never

export type ServerVariableRecord<T> = T extends Record<string, ServerVariableObjectType>
  ? { [P in keyof T]: ToSeverVariable<T> }
  : never
