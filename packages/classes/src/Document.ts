import * as S from '@byu-oit/openapi-schemas'
import { Info } from './Info'
import { Server } from './Server'
import { PathItem } from './PathItem'
import { Tag } from './Tag'
import { ExternalDocumentation } from './ExternalDocumentation'
import { Components } from './Components'
import { Base } from './Base'
import { Merge, Push, TypeCheckError } from './util'
import { TypeCompiler } from '@sinclair/typebox/compiler'

export class Document<T extends S.Document> extends Base implements S.Document {
  openapi!: T['openapi']
  info!: T['info']
  jsonSchemaDialect?: T['jsonSchemaDialect']
  servers?: T['servers']
  paths?: T['paths']
  webhooks?: T['webhooks']
  components?: T['components']
  security?: T['security']
  tags?: T['tags']
  externalDocs?: T['externalDocs']

  constructor (data: T)
  constructor (title: T['info']['title'], version: T['info']['version'], data?: Omit<T, 'title'> & { info: Omit<T['info'], 'version'> })
  constructor (value: T['info']['title'] | T, version?: T['info']['version'], data?: Omit<T, 'title'> & { info: Omit<T['info'], 'version'> }) {
    super()
    const openapi = typeof value === 'string'
      ? {
          version: '3.1.0', // Default to OAS v3.1.0
          ...data,
          info: {
            ...data?.info,
            title: value,
            version // API version
          }
        }
      : value
    Object.assign(this, openapi)
  }

  static from<T extends S.Document = S.Document> (value: unknown): Document<T> {
    const valid = Document.validator.Check(value)
    if (!valid) throw new TypeCheckError(Document.validator, value)
    return new Document(value) as Document<T>
  }

  static validator = TypeCompiler.Compile(S.TDocument)

  $openapi<U extends string>(version: U): Document<T & { openapi: U }> {
    return new Document({ ...this.json(), openapi: version })
  }

  $info<U extends S.Info>(data: U): Document<T & { info: Info<U> }> {
    return new Document({ ...this.json(), info: new Info(data) })
  }

  $jsonSchemaDialect<U extends string>(jsonSchemaDialect: U): Document<T & { jsonSchemaDialect: U }> {
    return new Document({ ...this.json(), jsonSchemaDialect })
  }

  $server<U extends S.Server> (data: U): Document<T & { servers: Push<T['servers'], Server<U>> }> {
    const servers = [...this.servers ?? [], new Server(data)]
    return new Document({ ...this.json(), servers })
  }

  $path<U extends string, V extends S.PathItem> (path: U, data?: V): Document<T & { paths: Merge<T['paths'], { [P in U]: PathItem<V> }> }> {
    const paths = { ...this.paths, [path]: new PathItem(data) }
    return new Document({ ...this.json(), paths })
  }

  $webhook<U extends string, V extends S.PathItem> (name: U, data?: V): Document<T & { webhooks: Merge<T['webhooks'], { [P in U]: PathItem<V> }> }> {
    const webhooks = { ...this.webhooks, [name]: new PathItem(data) }
    return new Document({ ...this.json(), webhooks })
  }

  $components<U extends S.Components>(data: U): Document<T & { components: U }> {
    const components = new Components(data)
    return new Document({ ...this.json(), components })
  }

  $securityRequirement<U extends string> (name: U, values: string[]): Document<T & { security: Push<T['security'], { [P in U]: string[] }> }> {
    const requirement = { [name]: values } as { [P in U]: string[] }
    const security = [...this.security ?? [], requirement]
    return new Document({ ...this.json(), security })
  }

  $tag<U extends S.Tag>(data: U): Document<T & { tags: Push<T['tags'], Tag<U>> }> {
    const tags = [...this.tags ?? [], new Tag(data)]
    return new Document({ ...this.json(), tags })
  }

  $externalDocs<U extends S.ExternalDocumentation> (data: U): Document<T & { externalDocs: ExternalDocumentation<U> }> {
    return new Document({ ...this.json(), externalDocs: new ExternalDocumentation(data) })
  }
}
