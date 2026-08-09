import { useCallback, useState } from 'react'
import { getNextPosition, getPrevPosition } from '../utils/storyNavigation'

// Owns the current { userIndex, storyIndex } position, or null when the
// tray is showing and no story is open. `users` is the full grouped list
// so the underlying position math can vary story count per user.
export function useStoryNavigation(users) {
  const [position, setPosition] = useState(null)

  const openUser = useCallback((userIndex) => {
    setPosition({ userIndex, storyIndex: 0 })
  }, [])

  const close = useCallback(() => {
    setPosition(null)
  }, [])

  const next = useCallback(() => {
    setPosition((current) => {
      if (current === null) return current
      return getNextPosition(users, current.userIndex, current.storyIndex)
    })
  }, [users])

  const prev = useCallback(() => {
    setPosition((current) => {
      if (current === null) return current
      const prevPosition = getPrevPosition(users, current.userIndex, current.storyIndex)
      return prevPosition === null ? current : prevPosition
    })
  }, [users])

  return { position, openUser, close, next, prev }
}
