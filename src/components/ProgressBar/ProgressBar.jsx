import './ProgressBar.css'

// Fully generic segmented progress bar. Has no idea what a "story" is 
// just a count of segments, which one is active, whether it should be
// playing yet, how long it takes, and a callback for when it finishes.
function ProgressBar({ count, activeIndex, isActive, durationMs, onSegmentComplete }) {
  return (
    <div className="progress-bar">
      {Array.from({ length: count }, (_, index) => {
        const isComplete = index < activeIndex
        const isPlaying = index === activeIndex && isActive

        return (
          <div className="progress-bar__segment" key={index}>
            <div
              className={[
                'progress-bar__fill',
                isComplete && 'progress-bar__fill--complete',
                isPlaying && 'progress-bar__fill--playing',
              ]
                .filter(Boolean)
                .join(' ')}
              style={isPlaying ? { animationDuration: `${durationMs}ms` } : undefined}
              onAnimationEnd={isPlaying ? onSegmentComplete : undefined}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProgressBar
