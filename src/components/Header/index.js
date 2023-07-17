import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {withRouter, Link} from 'react-router-dom'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {Navbar, HeaderImage, Button, LogoutBtn} from './styledComponents'
import './index.css'
import NxtWatchContext from '../../Context/NxtWatchContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderLogout = () => (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <LogoutBtn type="button" className="trigger-button">
            Logout
          </LogoutBtn>
        }
      >
        {close => (
          <div className="logout-popup">
            <p>Are you sure you want to logout?</p>
            <div>
              <LogoutBtn type="button" onClick={() => close()}>
                Close
              </LogoutBtn>
              <button
                type="button"
                className="highlight-btn"
                onClick={onClickLogout}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  )

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {activeTheme, changeTheme} = value
        const onChangeTheme = () => {
          changeTheme(activeTheme)
        }
        return (
          <Navbar>
            {activeTheme ? (
              <Link to="/">
                <HeaderImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                  alt="website logo"
                />
              </Link>
            ) : (
              <Link to="/">
                <HeaderImage
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                />
              </Link>
            )}
            <div className="logout-container">
              <Button type="button" data-testid="theme" onClick={onChangeTheme}>
                {activeTheme ? (
                  <BsBrightnessHigh className="light theme" />
                ) : (
                  <BsMoon className="theme" />
                )}
              </Button>

              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile"
              />
              {renderLogout()}
            </div>
          </Navbar>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
