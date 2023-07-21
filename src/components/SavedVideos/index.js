import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillFire} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import './index.css'
import NxtWatchContext from '../../Context/NxtWatchContext'
import {
  TrendPara,
  SpanDot,
  UnSavedVideosDiv,
  NoVideosImageEl,
  NotFoundHead,
  NotFoundPara,
} from './styledComponents'

class SavedVideos extends Component {
  state = {outline: false}

  render() {
    const {outline} = this.state
    console.log(outline)
    return (
      <div>
        <NxtWatchContext.Consumer>
          {value => {
            const {activeTheme, savedVideos} = value
            return (
              <div data-testid="savedVideos">
                <div className="gaming-heading">
                  <h1>
                    <span className="gaming-logo">
                      <AiFillFire size={40} />
                    </span>
                    Saved Videos
                  </h1>
                </div>
                <ul>
                  {savedVideos.length === 0 ? (
                    <UnSavedVideosDiv>
                      <NoVideosImageEl
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                      />
                      <NotFoundHead>No saved videos found</NotFoundHead>
                      <NotFoundPara>
                        You can save your videos while watching them
                      </NotFoundPara>
                    </UnSavedVideosDiv>
                  ) : (
                    <li className="trend-container">
                      {savedVideos.map(item => (
                        <Link
                          to={`/videos/${item.id}`}
                          key={item.id}
                          className="link"
                        >
                          <ul key={item.id} className="trend-subContainer">
                            <li>
                              <img
                                src={`${item.thumbnailUrl}`}
                                width="180px"
                                alt="video thumbnail"
                                className="trend-image"
                              />
                            </li>
                            <div className="trend-details">
                              <TrendPara
                                activeTheme={activeTheme}
                                fontSize="15px"
                              >
                                {item.title}
                              </TrendPara>
                              <p className="trend-head">{item.name}</p>
                              <div className="views-container">
                                <p>
                                  {item.viewCount} views
                                  <SpanDot activeTheme={activeTheme}>.</SpanDot>
                                </p>
                                <p className="sp">
                                  {formatDistanceToNow(
                                    new Date(item.publishedAt),
                                  )}
                                  ago
                                </p>
                              </div>
                            </div>
                          </ul>
                        </Link>
                      ))}
                    </li>
                  )}
                </ul>
              </div>
            )
          }}
        </NxtWatchContext.Consumer>
      </div>
    )
  }
}

export default SavedVideos
