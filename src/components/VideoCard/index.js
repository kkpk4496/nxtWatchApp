import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Load from '../Load'

import {
  VideoContainer,
  ParaEl,
  AttributesContainer,
  ChannelContainer,
  ImageEl,
  ContentContainer,
  IconParas,
} from './styledComponents'

import NxtWatchContext from '../../Context/NxtWatchContext'
import ErrorMessage from '../ErrorMessage'

import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoCard extends Component {
  state = {
    videoDetails: {},
    liked: false,
    disliked: false,
    saved: false,
    apiStatus: apiStatusValue[0],
    theme: '',
  }

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusValue.inProgess})
    this.mounted = true
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.video_details
      const convertedData = {
        channel: data.channel,
        description: data.description,
        id: data.id,
        publishedAt: data.published_at,
        thumbnailUrl: data.thumbnail_url,
        title: data.title,
        videoUrl: data.video_url,
        viewCount: data.view_count,
        name: data.channel.name,
        profileImageUrl: data.channel.profile_image_url,
        subscriberCount: data.channel.subscriber_count,
      }
      this.setState({
        videoDetails: convertedData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  isDisliked = () => {
    this.setState({liked: false, disliked: true})
  }

  isLiked = () => {
    this.setState({liked: true, disliked: false})
  }

  renderLoading = () => (
    <div className="loader" data-testid="loader">
      <Load />
    </div>
  )

  renderFailure = activeTheme => (
    <>
      <ErrorMessage refresh={this.getData} activeTheme={activeTheme} />
    </>
  )

  apiStatusResult = () => {
    const {apiStatus, theme} = this.state
    switch (apiStatus) {
      case apiStatusValue.inProgess:
        return this.renderLoading()
      case apiStatusValue.success:
        return this.renderSuccess()
      case apiStatusValue.failure:
        return this.renderFailure(theme)
      default:
        return null
    }
  }

  renderSuccess = () => {
    const {videoDetails, liked, disliked, saved} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      description,
      name,
      profileImageUrl,
      subscriberCount,
    } = videoDetails
    return (
      <NxtWatchContext.Consumer>
        {values => {
          const {activeTheme, addSavedVideos} = values
          const onSave = () => {
            addSavedVideos(videoDetails)
            this.setState(prevState => ({
              saved: !prevState.saved,
              theme: activeTheme,
            }))
          }

          return (
            <VideoContainer
              bgColor={activeTheme}
              color={activeTheme}
              data-testid="videoItemDetails"
            >
              <ReactPlayer url={videoUrl} controls className="react-player" />
              <ParaEl>
                <p>{title}</p>
              </ParaEl>

              <AttributesContainer>
                <ParaEl>
                  {viewCount} views . {publishedAt}
                </ParaEl>
                <ChannelContainer color={activeTheme}>
                  <IconParas
                    onClick={this.isLiked}
                    iconColor={liked ? '#2563eb' : '#64748b'}
                  >
                    <AiOutlineLike size={20} /> Like
                  </IconParas>
                  <IconParas
                    onClick={this.isDisliked}
                    iconColor={disliked ? '#2563eb' : '#64748b'}
                  >
                    <AiOutlineDislike size={20} /> Dislike
                  </IconParas>
                  <IconParas
                    onClick={onSave}
                    iconColor={saved ? '#2563eb' : '#64748b'}
                  >
                    <MdPlaylistAdd size={20} /> {saved ? 'Saved' : 'Save'}
                  </IconParas>
                </ChannelContainer>
              </AttributesContainer>
              <ChannelContainer>
                <ImageEl src={profileImageUrl} alt="channel logo" />
                <ContentContainer>
                  <ParaEl>{name}</ParaEl>
                  <ParaEl>{subscriberCount} subscribers</ParaEl>
                </ContentContainer>
              </ChannelContainer>
              <ParaEl padding="30px">{description}</ParaEl>
            </VideoContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  render() {
    return <>{this.apiStatusResult()}</>
  }
}

export default VideoCard
