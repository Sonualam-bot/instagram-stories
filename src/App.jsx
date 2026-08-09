import { useStories } from './hooks/useStories'
import { useStoryNavigation } from './hooks/useStoryNavigation'
import StoryTray from './components/StoryTray/StoryTray'
import StoryViewer from './components/StoryViewer/StoryViewer'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import './App.css'

// Composition root: fetches data and owns navigation state, then hands
// plain props down to presentational components. Nothing below this file
// talks to the network or knows how "active story" is tracked.
function App() {
  const { stories, isLoading, error } = useStories()
  const { activeIndex, openStory, close, next, prev } = useStoryNavigation(stories.length)

  const trayItems = stories.map((story) => ({
    id: story.id,
    avatarUrl: story.avatar,
    label: story.username,
  }))

  return (
    <div className="app">
      {isLoading && (
        <div className="app__status">
          <LoadingSpinner />
        </div>
      )}

      {error && <div className="app__status">Couldn't load stories.</div>}

      {!isLoading && !error && <StoryTray items={trayItems} onSelectItem={openStory} />}

      {activeIndex !== null && stories[activeIndex] && (
        <StoryViewer
          story={stories[activeIndex]}
          storyCount={stories.length}
          activeIndex={activeIndex}
          onNext={next}
          onPrev={prev}
          onClose={close}
        />
      )}
    </div>
  )
}

export default App
