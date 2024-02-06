type IconProps = {
  size?: number
}

export function IconPhone({ size = 18 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M7 4v16h10V4H7zM6 2h12a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm6 15a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
      />
    </svg>
  )
}

export function IconTablet({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
    >
      <path
        fill="currentColor"
        d="M20 7H4v10h16V7Zm2-1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1Z"
      />
      <rect width="10" height="1" x="7" y="15" fill="currentColor" rx=".5" />
    </svg>
  )
}

export function IconDesktop({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M4 16h16V5H4v11zm9 2v2h4v2H7v-2h4v-2H2.992A.998.998 0 0 1 2 16.993V4.007C2 3.451 2.455 3 2.992 3h18.016c.548 0 .992.449.992 1.007v12.986c0 .556-.455 1.007-.992 1.007H13z"
      />
    </svg>
  )
}

export function IconChevron({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 9L12 17L20 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconCopy({ size = 18 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconCheck({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M13.315 2.716A7.461 7.461 0 102.763 13.268 7.461 7.461 0 0013.315 2.716zM8.039 14.454a6.468 6.468 0 01-6.46-6.46 6.468 6.468 0 016.46-6.462A6.468 6.468 0 0114.5 7.992a6.468 6.468 0 01-6.46 6.461z"
      />
      <path
        fill="currentColor"
        d="M6.915 9.556L4.62 7.262l-.708.707 3.002 3.002 5.234-5.235-.707-.707-4.527 4.527z"
      />
    </svg>
  )
}

export function IconAlignLeft({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10 6H5v13h5V6zM3 4v17h9V4H3z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M22 7v2h-7V7h7zM22 11v2h-7v-2h7zM19 15v2h-4v-2h4z"
      />
    </svg>
  )
}

export function IconAlignRight({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19 6h-5v13h5V6zm-7-2v17h9V4h-9z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M10 7v2H3V7h7zM10 11v2H3v-2h7zM7 15v2H3v-2h4z"
      />
    </svg>
  )
}

export function IconAlignTop({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <defs />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19 5H5v5h14V5zM3 3v9h18V3H3z"
        clipRule="evenodd"
      />
      <path fill="currentColor" d="M20 14v2H3v-2h17zM14 18v2H3v-2h11z" />
    </svg>
  )
}

export function IconAlignBottom({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19 14H5v5h14v-5zM3 12v9h18v-9H3z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M20 4v2H3V4h17zM14 8v2H3V8h11zM7 12v2H3v-2h4z"
      />
    </svg>
  )
}

export function IconTextLeft({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M3 8V6h8v2zM3 13v-2h18v2zM3 18v-2h14v2z" />
    </svg>
  )
}

export function IconTextCenter({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M8 8V6h8v2zM3 13v-2h18v2zM5 18v-2h14v2z" />
    </svg>
  )
}

export function IconTextRight({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M11 8V6h10v2zM3 13v-2h18v2zM6 18v-2h15v2z" />
    </svg>
  )
}

export function IconCirclePlus({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconDown({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconTrash({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6l1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconCross({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.99999 5.58599L11.95 0.635986L13.364 2.04999L8.41399 6.99999L13.364 11.95L11.95 13.364L6.99999 8.41399L2.04999 13.364L0.635986 11.95L5.58599 6.99999L0.635986 2.04999L2.04999 0.635986L6.99999 5.58599Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconSearch({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.02 10.078 2.856 2.855-.943.943-2.855-2.855A6.002 6.002 0 0 1 .333 6.334c0-3.313 2.688-6 6-6a6.002 6.002 0 0 1 4.688 9.744Zm-1.337-.495a4.665 4.665 0 0 0-3.35-7.917 4.665 4.665 0 0 0-4.666 4.667 4.665 4.665 0 0 0 7.916 3.35l.1-.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconCode({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
      />
    </svg>
  )
}

export function IconFolder({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M3 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2H20a1 1 0 0 1 1 1v3h-2V7h-7.414l-2-2H4v11.998L5.5 11h17l-2.31 9.243a1 1 0 0 1-.97.757H3zm16.938-8H7.062l-1.5 6h12.876l1.5-6z"
      />
    </svg>
  )
}
export function IconBack({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 2.5L4.5 20.5L2.5 20.5L2.5 2.5L4.5 2.5ZM10.328 12.5L16.4 18.571L14.986 19.985L6.5 11.5L14.985 3.015L16.4 4.429L10.33 10.5L21.5 10.5L21.5 12.5L10.328 12.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconDots({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="3" width="4" height="4" rx="2" fill="currentColor" />
      <rect x="10" y="10" width="4" height="4" rx="2" fill="currentColor" />
      <rect x="10" y="17" width="4" height="4" rx="2" fill="currentColor" />
    </svg>
  )
}

export function IconSave({ size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 19v-6h10v6h2V7.828L16.172 5H5v14h2zM4 3h13l4 4v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 12v4h6v-4H9z"
        fill="currentColor"
      />
    </svg>
  )
}

export function IconCalendar({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z"
      />
    </svg>
  )
}

export function IconPage({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        d="M5 8v12h14V8H5zm0-2h14V4H5v2zm15 16H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 10h4v4H7v-4zm0 6h10v2H7v-2zm6-5h4v2h-4v-2z"
      />
    </svg>
  )
}

export function IconBlocs({ size = 24 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 4v5h16V4H4ZM3 2a1 1 0 0 0-1 1v7c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1H3ZM4 15v5h16v-5H4Zm-1-2a1 1 0 0 0-1 1v7c0 .6.4 1 1 1h18c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1H3Z"
        clipRule="evenodd"
      />
      <path fill="currentColor" d="M5 5h6v1H5V5ZM5 16h6v1H5v-1Z" />
    </svg>
  )
}
