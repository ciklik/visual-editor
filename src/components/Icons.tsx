type IconProps = {
  size?: number
}

export function IconPhone({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        fill="#000"
        d="M12.5 2h-7a1 1 0 00-1 1v12a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1zm-7 1h7v9h-7V3zm0 12v-2h7v2h-7z"
      />
      <path fill="currentColor" d="M8.5 13.5h1v1h-1v-1z" />
    </svg>
  )
}

export function IconDesktop({ size = 24 }: IconProps) {
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
        d="M13 2.625H3A1.377 1.377 0 001.625 4v7A1.377 1.377 0 003 12.375h4.625v1.25H6a.375.375 0 100 .75h4a.375.375 0 000-.75H8.375v-1.25H13A1.376 1.376 0 0014.375 11V4A1.376 1.376 0 0013 2.625zm-10 .75h10a.625.625 0 01.625.625v5.125H2.375V4A.626.626 0 013 3.375zm10 8.25H3A.626.626 0 012.375 11V9.875h11.25V11a.625.625 0 01-.625.625z"
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export function IconCopy({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        fill="currentColor"
        d="M14.75 3.5h-9.5a.75.75 0 00-.75.75v12a.75.75 0 00.75.75h9.5a.75.75 0 00.75-.75v-12a.75.75 0 00-.75-.75zM14.5 16h-9V4.5h9V16z"
      />
      <path
        fill="currentColor"
        d="M13 1.75a.75.75 0 00-.75-.75h-9.5a.75.75 0 00-.75.75v12a.75.75 0 00.75.75H3V2h10v-.25z"
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
        fill-rule="evenodd"
        d="M10 6H5v13h5V6zM3 4v17h9V4H3z"
        clip-rule="evenodd"
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
        fill-rule="evenodd"
        d="M19 6h-5v13h5V6zm-7-2v17h9V4h-9z"
        clip-rule="evenodd"
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
        fill-rule="evenodd"
        d="M19 5H5v5h14V5zM3 3v9h18V3H3z"
        clip-rule="evenodd"
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
        fill-rule="evenodd"
        d="M19 14H5v5h14v-5zM3 12v9h18v-9H3z"
        clip-rule="evenodd"
      />
      <path
        fill="currentColor"
        d="M20 4v2H3V4h17zM14 8v2H3V8h11zM7 12v2H3v-2h4z"
      />
    </svg>
  )
}
