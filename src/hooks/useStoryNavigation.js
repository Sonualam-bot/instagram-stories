import { useCallback, useState } from 'react'
import { getNextIndex, getPrevIndex } from '../utils/storyNavigation'

// Owns which story is active and how to move between them.
// activeIndex === null means the tray is showing, no story is open.
export function useStoryNavigation(totalStories) {
  const [activeIndex, setActiveIndex] = useState(null);

  const openStory = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const close = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const next = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current
      const nextIndex = getNextIndex(current, totalStories)
      return nextIndex // null closes the viewer when the last story is passed
    })
  }, [totalStories])

  const prev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return current
      const prevIndex = getPrevIndex(current)
      return prevIndex === null ? current : prevIndex // no-op at the first story
    })
  }, [])

  return { activeIndex, openStory, close, next, prev }
}
