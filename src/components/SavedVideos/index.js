import {Component} from 'react'
import './index.css'

class SavedVideos extends Component {
  state = {outline: false}

  render() {
    const {outline} = this.state
    console.log(outline)
    return (
      <div data-testid="savedVideos" className="saved-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
          alt="no saved videos"
          className="saved-videos"
        />
        <h1>No saved videos found</h1>
        <p>You can save your videos while watching them</p>
      </div>
    )
  }
}

export default SavedVideos
