import type {
  ForwardedRef,
  ForwardRefExoticComponent,
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  RefAttributes,
} from 'react'
import { forwardRef } from 'react'
import { Flex, UnstyledButton } from 'src/components/ui'
import styled from '@emotion/styled'

type SidebarHeadingProps = PropsWithChildren<{
  title: string
  description?: string
  onClick?: MouseEventHandler<HTMLElement>
}>

const Wrapper = styled(Flex)({})

const Title = styled.div({
  width: '100%',
  color: 'var(--ve-color-light)',
  textAlign: 'left',
  fontSize: '.95em',
  scrollMargin: '1.8em',
  cursor: 'pointer',
  strong: {
    display: 'block',
    color: 'var(--ve-color)',
    fontWeight: 500,
    fontSize: '1.1em',
  },
})

const HoverableActions = styled(Flex)({
  opacity: 0,
  transition: 'opacity .3s',
  [`*:hover > * > &`]: {
    opacity: 1,
  },
})

export const SidebarHeading = forwardRef<HTMLDivElement, SidebarHeadingProps>(
  (
    { children, onClick, title, description },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const as = onClick ? UnstyledButton : 'div'
    return (
      <Wrapper ref={ref} gap={0} between>
        <Title as={as} onClick={onClick}>
          <strong>{title}</strong>
          {description}
        </Title>
        {children}
      </Wrapper>
    )
  }
) as ForwardRefExoticComponent<
  SidebarHeadingProps & RefAttributes<HTMLDivElement>
> & { Hover: typeof SidebarHeadingHoverable }

SidebarHeading.displayName = 'SidebarHeading'

const SidebarHeadingHoverable: FunctionComponent<PropsWithChildren<{}>> = (
  props
) => {
  return <HoverableActions gap={0} {...props} />
}

SidebarHeading.Hover = SidebarHeadingHoverable
