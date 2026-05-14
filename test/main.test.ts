import {describe, expect, test} from 'bun:test'

import trimAround, {getSharedWhitespaceLength} from '../src/main.ts'

describe('getSharedWhitespaceLength', () => {
  test('returns 0 for empty input', () => {
    expect(getSharedWhitespaceLength([])).toBe(0)
  })
  test('returns the shared space prefix length', () => {
    expect(getSharedWhitespaceLength(['  hello', '  world'])).toBe(2)
  })
  test('returns the smallest shared indentation length', () => {
    expect(getSharedWhitespaceLength([' \thello', ' world'])).toBe(1)
  })
  test('ignores blank lines', () => {
    expect(getSharedWhitespaceLength(['\thello', '', '  \t', '\tworld'])).toBe(1)
  })
  test('supports mixed whitespace characters', () => {
    expect(getSharedWhitespaceLength([' \thello', '\t world'])).toBe(2)
  })
  test('supports Unicode whitespace', () => {
    const nonBreakingSpace = '\u00A0'
    const ideographicSpace = '\u3000'
    expect(getSharedWhitespaceLength([
      `${nonBreakingSpace}\thello`,
      `${ideographicSpace} world`,
    ])).toBe(2)
  })
})
describe('trimAround', () => {
  test('trims a single line', () => {
    expect(trimAround('  trim-around  ')).toBe('trim-around')
  })
  test('trims surrounding blank lines and shared indentation', () => {
    const result = trimAround(`
      hello
        world
    `)
    expect(result).toBe('hello\n  world')
  })
  test('preserves internal blank lines and trims trailing whitespace', () => {
    const result = trimAround(`
      hello

      world
    `)
    expect(result).toBe('hello\n\nworld')
  })
  test('supports Unicode whitespace indentation', () => {
    const nonBreakingSpace = '\u00A0'
    const ideographicSpace = '\u3000'
    const result = trimAround([
      '',
      `${nonBreakingSpace}\thello${nonBreakingSpace}`,
      `${ideographicSpace} ${nonBreakingSpace}world${ideographicSpace}`,
      '',
    ].join('\n'))
    expect(result).toBe(`hello\n${nonBreakingSpace}world`)
  })
  test('preserves the input line-break style', () => {
    const result = trimAround('\r\n  hello\r\n    world\r\n')
    expect(result).toBe('hello\r\n  world')
  })
  test('returns an empty string for whitespace-only input', () => {
    expect(trimAround('\n \t\u00A0 \n')).toBe('')
  })
})
