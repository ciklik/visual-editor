import styled from '@emotion/styled'
import { ButtonIcon, IconBack, UnstyledButton } from 'src/components/ui'
import { prevent } from 'src/functions/functions'

type SidebarToggleButtonProps = {
  collapsed: boolean
  onClick: Function
}

export function SidebarToggleButton({
  collapsed,
  onClick,
}: SidebarToggleButtonProps) {
  return (
    <Button onClick={prevent(onClick)} collapsed={collapsed}>
      <IconBack size={20} />
    </Button>
  )
}

export const Button = styled(ButtonIcon)<{ collapsed: boolean }>(
  {
    position: 'absolute',
    top: '10px',
    zIndex: 1001,
    boxShadow: 'var(--ve-field-shadow)',
    border: '1px solid var(--ve-hover)',
    transition: 'opacity .3s',
    '&:hover': { opacity: 1 },
  },
  (props) => ({
    left: props.collapsed ? '1em' : 'calc(var(--ve-clampedSidebar) + 1em)',
    opacity: props.collapsed ? 1 : 0,
    transform: props.collapsed ? 'rotate(180deg)' : 'none',
  })
)
