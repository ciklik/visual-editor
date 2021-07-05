export function hightlightComponent(index: number) {
  const target = (
    document.querySelector('#ve-preview') as HTMLIFrameElement
  ).contentDocument?.querySelector(`#component-${index}`) as HTMLElement
  target.scrollIntoView({ behavior: 'smooth' })
}
