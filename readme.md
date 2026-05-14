# trim-around

utility function that trims the start, end, line endings and superfluous indentation

## Usage

```ts
import trimAround from 'trim-around'

const result = trimAround(`
  hello
   world
`)
```

outputs:

```plaintext
hello
 world
```
