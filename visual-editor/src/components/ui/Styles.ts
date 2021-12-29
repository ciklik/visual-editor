/**
 * Styles shared across multiple components
 */
export const Styles = {
  Mosaic: {
    '--ve-transparentColor': '#ffffff',
    backgroundColor: '#d0d0d0',
    backgroundImage:
      'linear-gradient(45deg, var(--ve-transparentColor) 25%, transparent 25%), linear-gradient(-45deg, var(--ve-transparentColor) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--ve-transparentColor) 75%), linear-gradient(-45deg, transparent 75%, var(--ve-transparentColor) 75%)',
    backgroundSize: '10px 10px',
    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px',
  },
  FocusState: {
    borderColor: 'var(--ve-primary)',
    outline: 0,
    boxShadow: '0 0 0 0.25rem rgb(23 113 230 / 25%)',
  },
}
