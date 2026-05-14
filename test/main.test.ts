import {expect, test} from 'bun:test'

const {default: trimAround} = await import('#src/main.ts')

test('should run', () => {
  const result = trimAround()
  expect(result).toBe('trim-around') // TODO Test actual functionality
})
