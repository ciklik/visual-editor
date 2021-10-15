import { prevent } from 'src/functions/functions'
import cx from 'clsx'
import { BlocList } from './BlocList'
import { EditorComponentDefinitions } from '../../types'

type Props = {
  onToggle: () => void
  showBlocs: boolean
  iconsUrl: string
  onAddBloc: (name: string) => void
}

export function BlocAdder({ onToggle, showBlocs, iconsUrl, onAddBloc }: Props) {
  return (
    <>
      <button
        class={cx('ve-preview-add', showBlocs && 've-preview-add--active')}
        onClick={prevent(onToggle)}
      ></button>
      {showBlocs && <BlocList iconsUrl={iconsUrl} onAddBloc={onAddBloc} />}
    </>
  )
}
