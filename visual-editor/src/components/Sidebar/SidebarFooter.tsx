import { Button, Flex, IconSave } from 'src/components/ui'

import styled from '@emotion/styled'
import { t } from 'src/functions/i18n'

export function SidebarFooter() {
  return (
    <Wrapper between>
      <Mention>
        {t('poweredBy')} <br />
        <a href="https://ciklik.com" target="_blank">
          <Logo
            src="https://static.ciklik.com/logo.svg"
            alt="Logo Boxraiser"
          />
        </a>
      </Mention>
      <Button type="submit" icon={IconSave}>
        {t('save')}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)({
  marginTop: 'auto',
  backgroundColor: '#FFF',
  justifyContent: 'flex-end',
  borderTop: '1px solid rgba(0,0,0,0.06)',
  padding: '.5em 1em',
  boxShadow: '0 -1px 2px 0 rgba(0,0,0,0.05)',
})

const Mention = styled('div')({
  fontSize: '.7em',
  marginRight: 'auto',
})

const Logo = styled('img')({
  width: 'auto',
  height: 20,
})
