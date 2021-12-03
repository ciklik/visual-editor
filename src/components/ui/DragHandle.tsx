import Styles from './DragHandle.module.scss'

type DragHandleProps = {
}

export function DragHandle (props: DragHandleProps) {
  return <div className={Styles.DragHandle} {...props}/>
}
