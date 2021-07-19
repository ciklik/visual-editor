/**
 */
export function iframeStyle(color: string) {
  return `
:root {
  --ve-color: ${color};
}
#ve-components {
  overflow-x: hidden;
  overflow-y: visible;
}
.ve-preview-wrapper {
  position: relative;
}
.ve-preview-placeholder {
  position: relative;
  font-size: 1.2em;
  padding: 50px;
  text-align: center;
  opacity: .6;
}
.ve-preview-placeholder-hover {
  border: 2px dashed var(--ve-color);
  font-weight: bold;
  color: var(--ve-color);
}
.ve-preview-placeholder .ve-preview-droppable-top {
  height: 100%;
}
.ve-preview-component {
  position: relative;
}
.ve-preview-component.is-focused::before {
  content:'';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border: 2px dashed var(--ve-color);
  z-index: 10;
}
.ve-preview-component.is-over-top::after,
.ve-preview-component.is-over-bottom::after {
  content:'Insérer ici';
  color: #FFF;
  padding: .2em 1em;
  border-radius: 50px;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 50%, 0) ;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  background-color:var(--ve-color);
  z-index: 100;
}
.ve-preview-component::before {
  content:'';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 100;
}
.ve-preview-component.is-over::before {
  border-bottom: 1px solid var(--ve-color);
  border-top: 1px solid var(--ve-color);
}
.ve-preview-component.is-over-top::after {
  bottom: auto;
  top: 0;
  transform: translate3d(-50%, -50%, 0) ;
}
.ve-preview-component.is-over-bottom::before {
  border-bottom-width: 5px;
}
.ve-preview-component.is-over-top::before {
  border-top-width: 5px;
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

.ve-preview-droppable-top,
.ve-preview-droppable-bottom {
   position: absolute;
   top: var(--offsetY); 
   left:var(--offsetX);
   width: 100%;
   height: 50%; 
   z-index: 100;
   pointer-events: none;
}
.ve-preview-droppable-bottom {
   top: calc(50% + var(--offsetY)); 
}
`
}
