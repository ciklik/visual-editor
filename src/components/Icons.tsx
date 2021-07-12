type IconProps = {
  size?: number
}

export function IconPhone() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path
        fill="#000"
        d="M12.5 2h-7a1 1 0 00-1 1v12a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1zm-7 1h7v9h-7V3zm0 12v-2h7v2h-7z"
      />
      <path fill="currentColor" d="M8.5 13.5h1v1h-1v-1z" />
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
