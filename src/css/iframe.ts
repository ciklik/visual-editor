export function iframeStyle(color: string) {
  return `
:root {
  --ve-color: ${color};
}
.ve-preview-component.is-focused {
  position: relative;
}
.ve-preview-component.is-focused::before {
  content:'';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border: 4px dashed var(--ve-color);
  z-index: 10;
}
.ve-preview-component.is-loading::before {
   background-color:rgba(255, 255, 255, 0.6);
}
.ve-preview-component.is-loading::after {
  content:'';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  border-top: solid 2px var(--ve-color);
  z-index: 10;
  animation: veLoader infinite linear 1s;
}
@keyframes veLoader {
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
}
`
}
