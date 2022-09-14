// TODO - Implement Support for Extensions
// filterXVars returns a new object with the key-value pairs where the key starts with "x-"
export function filterExtensions (context: any): Record<string, unknown> {
  const extensions: Record<string, unknown> = {}
  for (const prop in context) {
    if (!prop.startsWith('x-')) continue
    extensions[prop] = context[prop]
  }
  return extensions
}
