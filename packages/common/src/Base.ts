import pickBy from 'lodash.pickby'

export class Base {
  json (): any {
    return pickBy(this, (value: unknown) => typeof value !== 'function')
  }
}
