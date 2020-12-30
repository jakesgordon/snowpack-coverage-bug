import { assert } from 'chai'
import { hello  } from './hello'

it('tests something', () => {
  assert.equal(hello(), 'world')
})
