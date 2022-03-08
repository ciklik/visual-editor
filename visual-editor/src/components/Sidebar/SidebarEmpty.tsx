import styled from '@emotion/styled'
import { t } from 'src/functions/i18n'
import { Button } from 'src/components/ui'
import { prevent } from 'src/functions/functions'

type Props = {
  onAction: Function
}

export function SidebarEmpty(data: Props) {
  return (
    <Wrapper>
      <p>{t('noContent')}</p>
      <div>
        <Button outline onClick={prevent(data.onAction)}>
          {t('useTemplate')}
        </Button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
})
