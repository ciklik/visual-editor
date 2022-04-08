import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const BaseStyles: FunctionComponent<
  PropsWithChildren<{
    complete?: boolean
  }>
> = ({ children, complete = true }) => {
  return (
    <>
      <Global styles={{ 'visual-editor': { display: 'block' } }} />
      <Reset complete={complete}>{children}</Reset>
    </>
  )
}

export const Reset = styled.div<{ complete: boolean }>(
  css`
    --ve-background: #fff;
    --ve-primary: #1771e6;
    --ve-dark: #202227;
    --ve-primary-hover: #388afa;
    --ve-primary-light: #1771e626;
    --ve-color: #111827;
    --ve-hover: #f3f4f9;
    --ve-color-light: #6b7280;
    --ve-field-border: rgb(209, 213, 219);
    --ve-field-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
    --ve-blocs-background: rgba(0, 0, 0, 0.05);
    --ve-danger: #ae2121;
    --ve-danger-light: rgba(255, 0, 0, 0.05);
    --ve-shadow-dragging: rgba(0, 0, 0, 0.1) 0 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
    --ve-gap: 0.5em;
    font-size: 16px;
    line-height: 1.4;

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
  `,
  (props) =>
    props.complete
      ? `
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }`
      : {}
)
