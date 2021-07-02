import JSX = preact.JSX

declare namespace preact {
  namespace JSX {
    interface HTMLAttributes<RefType extends EventTarget = EventTarget> {
      defaultValue?: string
    }
  }
}
