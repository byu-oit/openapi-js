import path from 'path'
import prettify from 'better-ajv-errors'
import { loadDirectory } from './util'
import * as OAS from '../src/schemas'
import { register } from '../src'

describe('v3.1', () => {
  if (OAS.TDocument.$id == null) throw Error('Missing Document $id')
  const validate = register().getSchema(OAS.TDocument.$id)
  if (validate == null) throw Error('Missing Document schema')

  const contents: Array<[string, unknown]> = loadDirectory(path.resolve(__dirname, './resources'))

  test.each(contents)('validate %s', (name, data) => {
    const ok = validate(data)
    if (validate.errors != null && validate.errors.length > 0) {
      console.error(prettify(OAS.TDocument, data, validate.errors))
    }
    expect(ok).toEqual(true)
  })
})
