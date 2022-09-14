import fs from 'fs'
import path from 'path'

export function loadDirectory (directory: string): Array<[string, unknown]> {
  const contents: Array<[string, unknown]> = []
  const reportDirFilenames = fs.readdirSync(directory)
  reportDirFilenames.forEach(filename => {
    const name = filename.split('.')[0]
    const filePath = path.join(directory, filename)
    contents.push([name, JSON.parse(fs.readFileSync(filePath).toString())])
  })
  return contents
}
