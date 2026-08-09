import { useEffect, useState } from 'react'
import { STORIES_DATA_URL } from '../constants/story.constants'

export function useStories() {
  const [stories, setStories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(STORIES_DATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load stories: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setStories(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { stories, isLoading, error }
}
