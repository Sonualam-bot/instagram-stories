import { useEffect } from 'react'
import { useStories } from './hooks/useStories'
import { useStoryNavigation } from './hooks/useStoryNavigation'
import { useViewedUsers } from './hooks/useViewedUsers'
import StoryTray from './components/StoryTray/StoryTray'
import StoryViewer from './components/StoryViewer/StoryViewer'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import './App.css'

// Composition root: fetches data and owns navigation/viewed state, then
// hands plain props down to presentational components. Nothing below this
// file talks to the network or knows how position/viewed state is tracked.
function App() {
  const { stories: users, isLoading, error } = useStories()
  const { position, openUser, close, next, prev } = useStoryNavigation(users)
  const { isViewed, markViewed } = useViewedUsers()

  // Marks the current user as viewed on every position change, not just on
  // the initial tap — covers auto-advancing straight through a user's
  // stories into the next one without ever tapping their thumbnail.
  useEffect(() => {
    if (position) {
      markViewed(users[position.userIndex].id)
    }
  }, [position, users, markViewed])

  const trayItems = users.map((user) => ({
    id: user.id,
    avatarUrl: user.avatar,
    label: user.username,
    isViewed: isViewed(user.id),
  }))

  const activeUser = position ? users[position.userIndex] : null
  const activeStory = activeUser ? activeUser.stories[position.storyIndex] : null

  return (
    <div className="app">
      {isLoading && (
        <div className="app__status">
          <LoadingSpinner />
        </div>
      )}

      {error && <div className="app__status">Couldn't load stories.</div>}

      {!isLoading && !error && <StoryTray items={trayItems} onSelectItem={openUser} />}

      {activeUser && activeStory && (
        <StoryViewer
          user={activeUser}
          story={activeStory}
          storyIndex={position.storyIndex}
          onNext={next}
          onPrev={prev}
          onClose={close}
        />
      )}
    </div>
  )
}

export default App
