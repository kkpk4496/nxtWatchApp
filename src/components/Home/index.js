import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import {BsDot} from 'react-icons/bs'
import {
  Banner,
  HomeContainer,
  ErrorContainer,
  ErrorImg,
  Head,
  Para,
  Button,
  SearchInput,
  SearchButton,
  NamePara,
  BannerPara,
} from './styledComponents'
import ErrorMessage from '../ErrorMessage'
import Load from '../Load'
import './index.css'
import NxtWatchContext from '../../Context/NxtWatchContext'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    outline: false,
    videosList: [],
    apiStatus: apiStatusValue.initial,
    searchVal: '',
  }

  componentDidMount() {
    this.homeVideos()
  }

  onChangeInput = event => {
    this.setState({searchVal: event.target.value})
  }

  homeVideos = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchVal} = this.state
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchVal}`
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
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
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

  onClickClose = () => {
    this.setState({outline: true})
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Load />
    </div>
  )

  renderFailureView = activeTheme => (
    <>
      <ErrorMessage refresh={this.homeVideos} activeTheme={activeTheme} />
    </>
  )

  renderSuccess = activeTheme => {
    const {videosList} = this.state

    if (videosList.length === 0) {
      return this.renderNoResults()
    }

    return (
      <li className="home-video-container">
        {videosList.map(item => (
          <Link to={`/videos/${item.id}`} key={item.id} className="links">
            <div key={item.id} className="home-subContainer">
              <li>
                <img
                  src={`${item.thumbnailUrl}`}
                  alt="video thumbnail"
                  className="home-image"
                />
              </li>
              <div className="logo-container">
                <NamePara
                  activeTheme={activeTheme}
                  className="logo-head"
                  fontSize="15px"
                >
                  <span>
                    <img
                      src={item.channel.profileImageUrl}
                      alt="channel logo"
                      className="profile-img"
                    />
                  </span>
                  {item.title}
                </NamePara>
                <div className="home-details">
                  <p>{item.channel.name}</p>
                  <div className="views-container">
                    <p>{item.views} views.</p>
                    <BsDot className="dot" size={25} />
                    <p>
                      {formatDistanceToNow(new Date(item.publishedDate))}
                      ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </li>
    )
  }

  apiStatus = activeTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValue.success:
        return this.renderSuccess(activeTheme)
      case apiStatusValue.inProgress:
        return this.renderLoading()
      case apiStatusValue.failure:
        return this.renderFailureView(activeTheme)
      default:
        return null
    }
  }

  renderNoResults = () => (
    <ErrorContainer>
      <ErrorImg
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <Head>No Search results found</Head>
      <Para>Try different key words or remove search filter</Para>
      <Button onClick={this.homeVideos}>Retry</Button>
    </ErrorContainer>
  )

  render() {
    const {outline, searchVal} = this.state
    return (
      <div>
        <NxtWatchContext.Consumer>
          {value => {
            const {activeTheme} = value
            return (
              <div>
                <Banner outline={outline} data-testid="banner">
                  <div className="logo-with-close">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                      className="logo-image"
                    />
                    <button
                      type="button"
                      className="close"
                      onClick={this.onClickClose}
                      data-testid="close"
                    >
                      <AiOutlineClose size={20} />
                    </button>
                  </div>
                  <BannerPara outline={outline}>
                    Buy Nxt Watch Premium prepaid plans with
                    <br />
                    UPI
                  </BannerPara>
                  <button type="button" className="banner-purchase">
                    GET IT NOW
                  </button>
                </Banner>
                <HomeContainer activeTheme={activeTheme} data-testid="Home">
                  <div className="search-container">
                    <SearchInput
                      type="search"
                      placeholder="search"
                      className="search-input"
                      onChange={this.onChangeInput}
                      value={searchVal}
                      activeTheme={activeTheme}
                    />
                    <SearchButton
                      type="button"
                      className="search-button"
                      data-testid="searchButton"
                      onClick={this.homeVideos}
                      activeTheme={activeTheme}
                    >
                      <AiOutlineSearch />
                    </SearchButton>
                  </div>
                  {this.apiStatus(activeTheme)}
                </HomeContainer>
              </div>
            )
          }}
        </NxtWatchContext.Consumer>
      </div>
    )
  }
}

export default Home
