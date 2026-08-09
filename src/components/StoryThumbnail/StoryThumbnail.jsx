import './StoryThumbnail.css'

// Generic circular thumbnail with a label. Knows nothing about "stories" 
// just an avatar image, a label, and a click handler.
function StoryThumbnail({ avatarUrl, label, isViewed, onClick }) {
  const ringClassName = [
    'story-thumbnail__ring',
    isViewed && 'story-thumbnail__ring--viewed',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className="story-thumbnail" onClick={onClick}>
      <span className={ringClassName}>
        <img src={avatarUrl} alt={label} className="story-thumbnail__image" />
      </span>
      <span className="story-thumbnail__label">{label}</span>
    </button>
  )
}

export default StoryThumbnail
