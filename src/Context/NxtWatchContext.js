import React from 'react'

const NxtWatchContext = React.createContext({
  activeTheme: false,
  savedVideos: [],
  addSavedVideos: () => {},
})

export default NxtWatchContext
