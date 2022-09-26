/**
 * A base class for sharing methods and functionality that all other objects in
 * the OpenAPI specification should inherit.
 */
export abstract class BaseObject<T> {
  /**
   * Reduces the class instance to it's json form. It is the responsibility of the
   * implementing class to return the specified type.
   *
   * @template T
   * @returns {T}
   */
  json(): T {
    return JSON.parse(JSON.stringify(this)) as T
  }
}
