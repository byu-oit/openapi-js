import path from 'path'
import { loadDirectory } from './util'
import { isDocumentObject } from '../src'

describe('v3.1', () => {
  const contents: Array<[string, unknown]> = loadDirectory(path.resolve(__dirname, './resources'))

  test.each(contents)('validate %s', (name, data) => {
    const ok = isDocumentObject.Check(data)
    if (!ok) {
      console.error('Invalid example encountered')
      console.error(JSON.stringify([...isDocumentObject.Errors(data)], null, 2))
    }
    expect(ok).toEqual(true)
  })
})
