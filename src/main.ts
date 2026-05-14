const lineBreakPattern = /\r\n|[\n\r\u2028\u2029]/u
const whitespaceCharacterPattern = /^\s$/u
const whitespaceOnlyPattern = /^\s*$/u
const isWhitespaceCharacter = (character: string) => {
  return whitespaceCharacterPattern.test(character)
}
const isWhitespaceOnly = (line: string) => {
  return whitespaceOnlyPattern.test(line)
}

export const getSharedWhitespaceLength = (lines: Array<string>) => {
  const contentLines = lines.filter(line => !isWhitespaceOnly(line))
  if (contentLines.length === 0) {
    return 0
  }
  let sharedWhitespaceLength = 0
  while (contentLines.every(line => {
    const character = line[sharedWhitespaceLength]
    return Boolean(character) && isWhitespaceCharacter(character)
  })) {
    sharedWhitespaceLength++
  }
  return sharedWhitespaceLength
}

export default function trimAround(input: string) {
  const lineBreak = lineBreakPattern.exec(input)?.[0] ?? '\n'
  const lines = input.split(lineBreakPattern).map(line => line.trimEnd())
  while (lines.length > 0 && isWhitespaceOnly(lines[0])) {
    lines.shift()
  }
  while (lines.length > 0 && isWhitespaceOnly(lines.at(-1)!)) {
    lines.pop()
  }
  const sharedWhitespaceLength = getSharedWhitespaceLength(lines)
  return lines.map(line => line.slice(sharedWhitespaceLength)).join(lineBreak)
}
