import { FlipperProps } from 'flip-toolkit/lib/types'
import { Component } from 'preact'

declare module 'react-flip-toolkit' {
  declare class Flipper extends Component<FlipperProps> {
    props: FlipperProps
    state: any
    context: any
    setState(s: any)
    forceUpdate(callback?: () => void)
  }
}
