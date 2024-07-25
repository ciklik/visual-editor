import { Button, Flex, IconSave } from 'src/components/ui'

import styled from '@emotion/styled'
import { t } from 'src/functions/i18n'
import { usePartialStore } from 'src/store'
import { ActionButton } from 'src/components/Sidebar/Actions/ActionButton'

export function SidebarFooter() {
  const { actions } = usePartialStore('actions')

  return (
    <Wrapper between>
      <Mention className="ve-footer-mention">
        {t('poweredBy')} <br />
        <a href="https://ciklik.com" target="_blank">
          <Logo src="https://static.ciklik.co/logo.svg" alt="Logo Boxraiser" />
        </a>
      </Mention>
      <Flex>
        {actions
          .filter((a) => a.position === 'footer')
          .map((a, k) => (
            <ActionButton {...a} key={k} />
          ))}
        <Button type="submit" icon={IconSave}>
          {t('save')}
        </Button>
      </Flex>
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
