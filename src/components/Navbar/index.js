import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiHome} from 'react-icons/hi'
import {AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {NavContainer, Span, ListItems} from './styledComponents'
import './index.css'
import NxtWatchContext from '../../Context/NxtWatchContext'

class Navbar extends Component {
  state = {
    Home: true,
    Trending: false,
    Gaming: false,
    Saved: false,
  }

  onClickHome = () => {
    this.setState({Trending: false, Home: true, Gaming: false, Saved: false})
  }

  onClickTrending = () => {
    this.setState({Trending: true, Home: false, Gaming: false, Saved: false})
  }

  onClickGaming = () => {
    this.setState({Trending: false, Home: false, Gaming: true, Saved: false})
  }

  onClickSavedVideos = () => {
    this.setState({Trending: false, Home: false, Gaming: false, Saved: true})
  }

  render() {
    const {Home, Trending, Gaming, Saved} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <div className="navbar-container">
              <NavContainer>
                <Link
                  to="/"
                  className="link-container"
                  highlight={this.TabHighlight}
                  onClick={this.onClickHome}
                >
                  <ListItems Highlight={Home}>
                    <Span className="icons">
                      <HiHome size={20} color={Home ? 'red' : '#7e858e'} />
                    </Span>
                    Home
                  </ListItems>
                </Link>
                <Link
                  to="/trending"
                  className="link-container"
                  highlight={this.TabHighlight}
                  onClick={this.onClickTrending}
                >
                  <ListItems Highlight={Trending}>
                    <Span className="icons">
                      <AiFillFire
                        size={20}
                        color={Trending ? 'red' : '#7e858e'}
                      />
                    </Span>
                    Trending
                  </ListItems>
                </Link>
                <Link
                  to="/gaming"
                  className="link-container"
                  highlight={this.TabHighlight}
                  onClick={this.onClickGaming}
                >
                  <ListItems Highlight={Gaming}>
                    <Span className="icons">
                      <SiYoutubegaming
                        size={20}
                        color={Gaming ? 'red' : '#7e858e'}
                      />
                    </Span>
                    Gaming
                  </ListItems>
                </Link>
                <Link
                  to="/saved-videos"
                  className="link-container"
                  highlight={this.TabHighlight}
                  onClick={this.onClickSavedVideos}
                >
                  <ListItems Highlight={Saved}>
                    <Span className="icons">
                      <MdPlaylistAdd
                        size={20}
                        color={Saved ? 'red' : '#7e858e'}
                      />
                    </Span>
                    Saved Videos
                  </ListItems>
                </Link>
              </NavContainer>
              <div>
                <p className="contact">CONTACT US</p>
                <div className="social-media">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-icons"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="social-icons"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="social-icons"
                  />
                </div>
                <p className="contact">
                  Enjoy! Now to see your
                  <br /> channels and <br />
                  recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Navbar
