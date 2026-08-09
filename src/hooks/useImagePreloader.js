import { useEffect, useState } from 'react'

// Generic image preload/status tracker — knows nothing about stories,
// reusable for any <img> that needs a loading state.
export function useImagePreloader(url) {
  const [status, setStatus] = useState('idle') // idle | loading | loaded | error

  useEffect(() => {
    if (!url) {
      setStatus('idle')
      return;
    }

    setStatus('loading')
    let cancelled = false

    const img = new Image()
    img.src = url
    img.onload = () => {
      if (!cancelled) setStatus('loaded')
    }
    img.onerror = () => {
      if (!cancelled) setStatus('error')
    }

    return () => {
      cancelled = true
    }
  }, [url])

  return status
}
