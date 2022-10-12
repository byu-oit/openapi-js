import { Document } from '@byu-oit/openapi.document'

export const PetStore = new Document({
  openapi: '3.1.0',
  info: {
    title: 'Pet Store',
    version: '1.0.0'
  },
  paths: {
    '/{byu_id}': {}
  }
})
