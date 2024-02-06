import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { type PropsWithChildren } from 'react'
import { useWindowSize } from 'react-use'
import { usePartialStore } from 'src/store'
import { headerHeight } from 'src/components/Header/Header'

export function PreviewWrapper({ children }: PropsWithChildren) {
  const style = useViewportStyle()
  return (
    <ViewportWrapper>
      <Viewport id="viewport" style={style}>
        {children}
      </Viewport>
    </ViewportWrapper>
  )
}

function useViewportStyle() {
  const { height: windowHeight, width: windowWidth } = useWindowSize()
  const { device, sidebarWidth } = usePartialStore('device', 'sidebarWidth')
  const viewportWidth = windowWidth - (sidebarWidth / 100) * windowWidth
  const viewportHeight = windowHeight - headerHeight
  const deviceWidth =
    typeof device.width === 'number' ? device.width : viewportWidth
  const deviceHeight =
    typeof device.height === 'number' ? device.height : viewportHeight

  console.log({
    sidebarWidth,
    viewport: [viewportWidth, viewportHeight],
    device: [deviceWidth, deviceHeight],
  })

  let scale = 1
  if (deviceWidth > viewportWidth || deviceHeight > viewportHeight) {
    scale = Math.min(viewportWidth / deviceWidth, viewportHeight / deviceHeight)
  }

  return {
    width: Number.isInteger(device.width) ? device.width : '100%',
    height: Number.isInteger(device.height) ? device.height : '100%',
    transform: `scale(${scale.toFixed(2)})`,
  }
}

const Out = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(50px)', opacity: 0 },
})

const In = keyframes({
  from: { transform: 'translateX(50px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

export const ViewportWrapper = styled.div({
  width: '100%',
  height: '100%',
  paddingTop: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: 'var(--ve-hover)',
  animation: `${In} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
  '[hidden="hidden"] &': {
    animationName: `${Out}`,
  },
})

export const Viewport = styled.div({
  flex: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.2) 0 4px 8px 0',
})
