import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {SiYoutubegaming} from 'react-icons/si'
import ErrorMessage from '../ErrorMessage'
import Load from '../Load'
import './index.css'
import {GamePara, GameContainer} from './styledComponents'
import NxtWatchContext from '../../Context/NxtWatchContext'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {outline: false, videosList: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.gamingVideos()
  }

  gamingVideos = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        views: each.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderFailureView = () => <ErrorMessage refresh={this.gamingVideos} />

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Load />
    </div>
  )

  renderSuccess = () => {
    const {videosList} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <GameContainer activeTheme={activeTheme} data-testid="gaming">
              <li className="list-container">
                {videosList.map(item => (
                  <Link
                    to={`/videos/${item.id}`}
                    key={item.id}
                    className="link"
                  >
                    <div key={item.id}>
                      <li>
                        <img
                          src={`${item.thumbnailUrl}`}
                          width="180px"
                          alt="video thumbnail"
                          className="game-image"
                        />
                      </li>
                      <li>
                        <GamePara color={activeTheme} fontSize="15px">
                          {item.title}
                        </GamePara>
                      </li>
                      <li>
                        <p fontSize="12px">{item.views} Watching Worldwide</p>
                      </li>
                    </div>
                  </Link>
                ))}
              </li>
            </GameContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  apiCall = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoading()
      case apiStatusValue.success:
        return this.renderSuccess()
      case apiStatusValue.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {outline} = this.state
    console.log(outline)
    return (
      <div>
        <div className="gaming-heading">
          <h1>
            <span className="gaming-logo">
              <SiYoutubegaming size={40} />
            </span>
            Gaming
          </h1>
        </div>
        <ul>{this.apiCall()}</ul>
      </div>
    )
  }
}

export default Gaming
