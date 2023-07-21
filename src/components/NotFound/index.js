import './index.css'
import NxtWatchContext from '../../Context/NxtWatchContext'
import {H, P} from './styledComponents'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {values => {
      const {activeTheme} = values
      return (
        <div className="not-found-container">
          {activeTheme ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
              alt="not found"
              className="not-found-img"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
              alt="not found"
              className="not-found-img"
            />
          )}

          <H activeTheme={activeTheme}>Page Not Found</H>
          <P activeTheme={activeTheme}>
            we are sorry, the page you requested could not be found.
          </P>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
