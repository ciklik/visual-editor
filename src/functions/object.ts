type Keypath = string | string[]
type ExplorableObject = Record<string, unknown> | Array<Object>

// gist : https://gist.github.com/LukeChannings/15c92cef5a016a8b21a0
// ensure the keys being passed is an array of key paths
// example: 'a.b' becomes ['a', 'b'] unless it was already ['a', 'b']
function keys (ks: Keypath): string[] {
  return Array.isArray(ks) ? ks : ks.split('.')
}

// traverse the set of keys left to right,
// returning the current value in each iteration.
// if at any point the value for the current key does not exist,
// return the default value
function deepGet (o: ExplorableObject, kp: Keypath, d: any = null): unknown {
  return keys(kp).reduce((o, k) => o && (Array.isArray(o) ? o[parseInt(k)] : o[k]) || d, o)
}

// traverse the set of keys right to left,
// returning a new object containing both properties from the object
// we were originally passed and our new property.
//
// Example:
// If o = { a: { b: { c: 1 } } }
//
// deepSet(o, ['a', 'b', 'c'], 2) will progress thus:
// 1. c = Object.assign({}, {c: 1}, { c: 2 })
// 2. b = Object.assign({}, { b: { c: 1 } }, { b: c })
// 3. returned = Object.assign({}, { a: { b: { c: 1 } } }, { a: b })
export function deepSet (object: ExplorableObject, keyPath: Keypath, value: any) {
  return keys(keyPath).reduceRight((acc, key, i, keys: string[]) => {
    const original = deepGet(object, keys.slice(0, i))
    if (Array.isArray(original)) {
      return original.map((v, k) => {
        if (k.toString() === key) {
          return acc
        }
        return v
      })
    } else {
      return Object.assign({}, original, { [key]: acc })
    }
  }, value)
}
