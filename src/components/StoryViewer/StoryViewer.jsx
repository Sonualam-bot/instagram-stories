import { STORY_DURATION_MS, TAP_ZONE_SPLIT } from '../../constants/story.constants'
import { useImagePreloader } from '../../hooks/useImagePreloader'
import ProgressBar from '../ProgressBar/ProgressBar'
import TapZones from '../TapZones/TapZones'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import './StoryViewer.css'

// Orchestrator: wires the image-preload status into the progress bar and
// tap navigation. Receives all story data + navigation callbacks as props —
// it never fetches or owns index state itself.
function StoryViewer({ story, storyCount, activeIndex, onNext, onPrev, onClose }) {
  const status = useImagePreloader(story.imageUrl)
  const isReady = status === 'loaded' || status === 'error'
  const isLoading = !isReady

  return (
    <div className="story-viewer">
      <ProgressBar
        count={storyCount}
        activeIndex={activeIndex}
        isActive={isReady}
        durationMs={STORY_DURATION_MS}
        onSegmentComplete={onNext}
      />

      <div className="story-viewer__header">
        <img src={story.avatar} alt="" className="story-viewer__avatar" />
        <span className="story-viewer__username">{story.username}</span>
        <button
          type="button"
          className="story-viewer__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div className="story-viewer__media">
        {isLoading && (
          <div className="story-viewer__overlay">
            <LoadingSpinner />
          </div>
        )}

        {status === 'error' ? (
          <div className="story-viewer__overlay">
            <span className="story-viewer__error-text">Couldn't load this story</span>
          </div>
        ) : (
          <img
            src={story.imageUrl}
            alt=""
            className="story-viewer__image"
            style={{ opacity: isReady ? 1 : 0 }}
          />
        )}

        <TapZones onTapLeft={onPrev} onTapRight={onNext} splitRatio={TAP_ZONE_SPLIT} />
      </div>
    </div>
  )
}

export default StoryViewer
