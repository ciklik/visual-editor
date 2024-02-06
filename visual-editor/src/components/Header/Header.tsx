import styled from '@emotion/styled'
import {
  Flex,
  IconDesktop,
  IconPhone,
  IconTablet,
  Tooltip,
} from 'src/components/ui'
import { usePartialStore } from 'src/store'
import { prevent } from 'src/functions/functions'

export function Header() {
  const {
    sidebarWidth,
    devices,
    setDevice,
    device: currentDevice,
  } = usePartialStore('sidebarWidth', 'devices', 'setDevice', 'device')
  return (
    <Wrapper center style={{ left: `${sidebarWidth}vw` }}>
      {devices.map((device) => (
        <Tooltip content={device.name} key={device.name}>
          <Button
            onClick={prevent(() => setDevice(device))}
            aria-selected={device === currentDevice}
          >
            <DeviceIcon icon={device.icon} />
          </Button>
        </Tooltip>
      ))}
    </Wrapper>
  )
}

function DeviceIcon({ icon }: { icon: string }) {
  if (icon === 'tablet') {
    return <IconTablet />
  }
  if (icon === 'desktop') {
    return <IconDesktop />
  }
  return <IconPhone />
}

export const headerHeight = 50

const Wrapper = styled(Flex)({
  position: 'fixed',
  top: 0,
  left: 0,
  gap: 0,
  right: 0,
  zIndex: 2,
  padding: '0 1em',
  flex: 'none',
  backgroundColor: '#FFF',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0',
  height: headerHeight,
})

const Button = styled('button')({
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  height: headerHeight,
  padding: '1rem',
  background: 'transparent',
  borderBottom: 'solid 4px transparent',
  '&:hover': {
    background: 'var(--ve-hover)',
    color: 'var(--ve-dark)',
  },
  '&[aria-selected="true"]': {
    background: 'var(--ve-hover)',
    color: 'var(--ve-primary)',
    borderBottom: 'solid 4px var(--ve-primary)',
  },
})
