// Pure index math for story navigation.
// trivially testable and reusable outside of hooks.

export function getNextIndex(currentIndex, length) {
  const next = currentIndex + 1
  return next < length ? next : null
}

export function getPrevIndex(currentIndex) {
  const prev = currentIndex - 1
  return prev >= 0 ? prev : null
}
