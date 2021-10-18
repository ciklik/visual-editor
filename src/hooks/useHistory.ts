import { useEffect, useRef } from 'preact/hooks'
import { useUpdateData } from 'src/store'
import { useUpdateEffect } from './useUpdateEffect'

class EditHistory<T> {
  stack: Array<T> = []
  limit = 15
  cursor = 0

  push(entry: T) {
    // On ne peut pas pousser 2 fois le même consécutivement
    if (this.stack.includes(entry)) {
      return
    }
    // L'historique est limité, on oublie les anciennes actions
    if (this.stack.length === this.limit) {
      this.stack.shift()
    }
    // Si on est au milieu de l'historique, une action efface le futur
    if (this.cursor !== this.stack.length - 1) {
      this.stack.splice(this.cursor + 1, this.stack.length)
    }
    this.stack.push(entry)
    this.cursor = this.stack.length - 1
    this.debug()
  }

  rollback(): T {
    this.cursor--
    if (this.cursor < 0) {
      this.cursor = 0
    }
    this.debug()
    return this.stack[this.cursor]
  }

  forward(): T {
    this.cursor++
    if (this.cursor > this.stack.length - 1) {
      this.cursor = this.stack.length - 1
    }
    this.debug()
    return this.stack[this.cursor]
  }

  debug() {
    let entries = []
    for (let k in this.stack) {
      entries.push(k === this.cursor.toFixed() ? 'x' : '_')
    }
  }
}

export function useHistory<T>(data: T, enabled: boolean) {
  const updateData = useUpdateData()
  const history = useRef(new EditHistory<T>())
  const previousData = useRef(data)

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const listener = (event: KeyboardEvent) => {
      // Si on est sur un input, on ne fait rien
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
        event.stopPropagation()
        event.preventDefault()
        if (event.shiftKey) {
          updateData(history.current.forward())
        } else {
          updateData(history.current.rollback())
        }
      }
    }
    document.addEventListener('keydown', listener, true)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [enabled])

  useUpdateEffect(() => {
    if (!enabled) {
      return;
    }
    if (data !== previousData.current) {
      history.current.push(data)
      previousData.current = data
    }
  }, [data])
}
