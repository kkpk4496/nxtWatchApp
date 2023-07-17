import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {AiFillFire} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import Load from '../Load'
import './index.css'
import ErrorMessage from '../ErrorMessage'
import NxtWatchContext from '../../Context/NxtWatchContext'
import {TrendPara, SpanDot} from './styledComponents'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {outline: false, videosList: [], apiStatus: apiStatusValue.initial}

  componentDidMount() {
    this.trendingVideos()
  }

  trendingVideos = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        views: each.view_count,
        publishedDate: each.published_at,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Load />
    </div>
  )

  renderSuccess = activeTheme => {
    const {videosList} = this.state

    return (
      <li className="trend-container">
        {videosList.map(item => (
          <Link to={`/videos/${item.id}`} key={item.id} className="link">
            <div key={item.id} className="trend-subContainer">
              <li>
                <img
                  src={`${item.thumbnailUrl}`}
                  width="180px"
                  alt="video thumbnail"
                  className="trend-image"
                />
              </li>
              <div className="trend-details">
                <TrendPara activeTheme={activeTheme} fontSize="15px">
                  {item.title}
                </TrendPara>
                <p className="trend-head">{item.name}</p>
                <div className="views-container">
                  <p>
                    {item.views} views{' '}
                    <SpanDot activeTheme={activeTheme}> .</SpanDot>
                  </p>
                  <p className="sp">
                    {formatDistanceToNow(new Date(item.publishedDate))}
                    ago
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </li>
    )
  }

  renderFailure = activeTheme => (
    <>
      <ErrorMessage refresh={this.trendingVideos} activeTheme={activeTheme} />
    </>
  )

  apiStatusResult = activeTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValue.inProgess:
        return this.renderLoading()
      case apiStatusValue.success:
        return this.renderSuccess(activeTheme)
      case apiStatusValue.failure:
        return this.renderFailure(activeTheme)
      default:
        return null
    }
  }

  render() {
    const {outline} = this.state
    console.log(outline)
    return (
      <div>
        <NxtWatchContext.Consumer>
          {value => {
            const {activeTheme} = value
            return (
              <div data-testid="trending">
                <div className="gaming-heading">
                  <h1>
                    <span className="gaming-logo">
                      <AiFillFire size={40} />
                    </span>
                    Trending
                  </h1>
                </div>
                <ul>{this.apiStatusResult(activeTheme)}</ul>
              </div>
            )
          }}
        </NxtWatchContext.Consumer>
      </div>
    )
  }
}

export default Trending
