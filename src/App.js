import {Component} from 'react'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NxtWatchContext from './Context/NxtWatchContext'
import {MainContainer} from './styledComponents'
import VideoCard from './components/VideoCard'

class App extends Component {
  state = {savedVideos: [], activeTheme: false}

  changeTheme = () => {
    this.setState(prevState => ({activeTheme: !prevState.activeTheme}))
  }

  render() {
    const {savedVideos, activeTheme} = this.state
    return (
      <NxtWatchContext.Provider
        value={{activeTheme, savedVideos, changeTheme: this.changeTheme}}
      >
        <MainContainer activeTheme={activeTheme}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <div>
              <Header />
              <div className="navbar-align">
                <Navbar />
                <div className="containers">
                  <Switch>
                    <ProtectedRoute exact path="/" component={Home} />
                    <ProtectedRoute
                      exact
                      path="/trending"
                      component={Trending}
                    />
                    <ProtectedRoute exact path="/gaming" component={Gaming} />
                    <ProtectedRoute
                      exact
                      path="/saved-videos"
                      component={SavedVideos}
                    />
                    <ProtectedRoute
                      exact
                      path="/videos/:id"
                      component={VideoCard}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </Switch>
        </MainContainer>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
