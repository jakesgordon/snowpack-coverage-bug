import { assert } from 'chai'
import { value  } from './example'

it('tests the imported value', () => {
  assert.equal(value, 'Hello World')
})
