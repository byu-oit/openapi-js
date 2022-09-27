# @byu-oit/openapi.contact

### Introduction

Contact information for the exposed API.

For details about this OpenAPI specification definition, please see: https://spec.openapis.org/oas/latest.html#contact-object

### Usage

```ts
import { Contact } from '@byu-oit/openapi.contact'

const contact = new Contact()
  .$name('Cosmo Cougar')
  .$url('https://byu.edu')
  .$email('cosmo@byu.edu')

const data = contact.json()
/**
 * `data` should look like this:
 * {
 *    name: 'Cosmo Cougar',
 *    url: 'https://byu.edu',
 *    email: 'cosmo@byu.edu'
 * }
 */
```
