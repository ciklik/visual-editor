import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import weakMemoize from '@emotion/weak-memoize'

let memoizedCreateCacheWithContainer = weakMemoize((container: Document) => {
  return createCache({
    container: container.querySelector('head')!,
    key: 'iframe',
  })
})

type FrameProviderProps = {
  container: Document
  children: JSX.Element
}

/**
 * Create a CSS-in-JS context to inject the CSS in a specific container (useful for iframes)
 */
export function FrameProvider({ container, children }: FrameProviderProps) {
  return (
    <CacheProvider value={memoizedCreateCacheWithContainer(container)}>
      {children}
    </CacheProvider>
  )
}
