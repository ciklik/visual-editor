export async function copyToClipboard(text: string): Promise<true> {
  try {
    const result = await navigator.permissions.query({ name: 'clipboard-write' })
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
