import StoryThumbnail from '../StoryThumbnail/StoryThumbnail'
import './StoryTray.css'

// Renders a horizontally scrollable row of thumbnails.
// `items` is a generic [{ id, avatarUrl, label }] shape — mapping the raw
// story data into this shape happens at the composition root (App.jsx),
// so this component stays agnostic of what a "story" actually is.
function StoryTray({ items, onSelectItem }) {
  return (
    <div className="story-tray">
      {items.map((item, index) => (
        <StoryThumbnail
          key={item.id}
          avatarUrl={item.avatarUrl}
          label={item.label}
          onClick={() => onSelectItem(index)}
        />
      ))}
    </div>
  )
}

export default StoryTray
