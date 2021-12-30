import { IconSearch, Styles } from 'src/components/ui'
import styled from '@emotion/styled'
import { t } from 'src/functions/i18n'

type BlocSelectorSearchProps = {
  value: string
  onChange: (v: string) => void
}

const Wrapper = styled.div({
  position: 'relative',
  float: 'right',
  svg: {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    color: 'var(--ve-color-light)',
    transform: 'translateY(-50%)',
  },
})

const Input = styled.input({
  height: 40,
  background: 'var(--ve-hover)',
  borderRadius: 40,
  padding: '0 1rem 0 2.6rem',
  border: '1px solid transparent',
  font: 'inherit',
  '&:focus': Styles.FocusState
})

export function BlocSelectorSearch({
  value,
  onChange,
}: BlocSelectorSearchProps) {
  return (
    <Wrapper>
      <Input
        type="search"
        placeholder={t('searchComponent')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <IconSearch size={14} />
    </Wrapper>
  )
}
