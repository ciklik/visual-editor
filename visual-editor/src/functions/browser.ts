export async function copyToClipboard (text: string): Promise<true> {
  try {
    const permissionName = 'clipboard-write' as PermissionName
    const result = await navigator.permissions.query({
      name: permissionName,
    })
    if (result.state == 'granted' || result.state == 'prompt') {
      await navigator.clipboard.writeText(text)
      return true
    }
    throw result
  } catch (e) {
    await navigator.clipboard.writeText(text)
    return true
  }
}

export function isClientSide (): boolean {
  return !!(typeof window !== 'undefined' && window.document)
}
