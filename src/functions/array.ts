export function moveItem<T extends Array<unknown>>(items: T, from: number, to: number): T {
  const clone = [...items] as T;
  if (to >= clone.length) {
    let k = to - clone.length + 1;
    while (k--) {
      clone.push(undefined);
    }
  }
  clone.splice(to, 0, items.splice(from, 1)[0]);
  return clone;
}
