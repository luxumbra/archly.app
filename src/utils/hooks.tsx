import { useContext, useLayoutEffect, useState } from 'react'

import { ThemeContext } from '@archly/contexts'

// eslint-disable-next-line import/prefer-default-export
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => matchMedia(query).matches)

  useLayoutEffect(() => {
    const mediaQuery = matchMedia(query)

    function onMediaQueryChange(): void {
      setMatches(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', onMediaQueryChange)

    return (): void => {
      mediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [query])

  return matches
}

/**
 * Dark Mode Toggle
 *
 * Allows the user to toggle the light/dark mode of the website.
 *
 */
export function useDarkMode(): { theme: string; toggleTheme: () => void } {
  const { theme, setTheme } = useContext(ThemeContext)
  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    console.log('toggleTheme', theme)
  }
  return { theme, toggleTheme }
}
