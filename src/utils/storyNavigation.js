// Pure position math for two-level (user -> story) navigation.
// No React, no side effects — trivially testable and reusable outside hooks.
// Operates on any `users: [{ stories: [...] }]` shape.

export function getNextPosition(users, userIndex, storyIndex) {
  const currentUser = users[userIndex]

  if (storyIndex + 1 < currentUser.stories.length) {
    return { userIndex, storyIndex: storyIndex + 1 }
  }

  if (userIndex + 1 < users.length) {
    return { userIndex: userIndex + 1, storyIndex: 0 }
  }

  return null
}

export function getPrevPosition(users, userIndex, storyIndex) {
  if (storyIndex - 1 >= 0) {
    return { userIndex, storyIndex: storyIndex - 1 }
  }

  if (userIndex - 1 >= 0) {
    const prevUser = users[userIndex - 1]
    return { userIndex: userIndex - 1, storyIndex: prevUser.stories.length - 1 }
  }

  return null
}
