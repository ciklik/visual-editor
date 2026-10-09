// react-datepicker 4 ships no types, only the props used by the DatePicker field
declare module 'react-datepicker' {
  import type { ComponentType } from 'react'

  const ReactDatePicker: ComponentType<{
    selected?: Date | null
    showTimeInput?: boolean
    inline?: boolean
    onChange: (date: Date | null) => void
    onClickOutside?: () => void
  }>
  export default ReactDatePicker
}
