import { PathItem } from '../PathItem'
import { CallbackObjectType } from './schema'

/**
 * This is a convenience class for completeness. A Callback is a PathItem so we alias
 * them here.
 */
export class Callback<T extends CallbackObjectType = CallbackObjectType> extends PathItem<T> {}
