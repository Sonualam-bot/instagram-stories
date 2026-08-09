import { useCallback, useState } from 'react'

// Generic "has this id been seen" tracker — not tied to the story domain,
// reusable for any list of viewable items keyed by id.
export function useViewedUsers() {
  const [viewedIds, setViewedIds] = useState(() => new Set())

  const markViewed = useCallback((id) => {
    setViewedIds((current) => {
      if (current.has(id)) return current
      const next = new Set(current)
      next.add(id)
      return next
    })
  }, [])

  const isViewed = useCallback((id) => viewedIds.has(id), [viewedIds])

  return { isViewed, markViewed }
}
