import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginContainer,
  ShadowContainer,
  Image,
  Label,
  Input,
  Container,
  Button,
  ErrorMessage,
  ShowLabel,
} from './styledComponents'
import NxtWatchContext from '../../Context/NxtWatchContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = activeTheme => {
    const {username} = this.state
    return (
      <>
        <Container>
          <Label htmlFor="username" activeBg={activeTheme}>
            USERNAME
          </Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={this.onChangeUsername}
            placeholder="Username"
            activeBg={activeTheme}
          />
        </Container>
      </>
    )
  }

  renderPassword = activeTheme => {
    const {password, showPassword} = this.state
    return (
      <>
        <Container>
          <Label htmlFor="password" activeBg={activeTheme}>
            PASSWORD
          </Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
            activeBg={activeTheme}
          />
        </Container>
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {activeTheme} = value
          return (
            <LoginContainer LoginTheme={activeTheme}>
              <ShadowContainer>
                {activeTheme ? (
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                  />
                ) : (
                  <Image
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}

                <form onSubmit={this.submitForm}>
                  <div>{this.renderUsername(activeTheme)}</div>
                  <div>{this.renderPassword(activeTheme)}</div>
                  <Container LoginTheme={activeTheme}>
                    <div>
                      <input
                        type="checkbox"
                        id="checkbox"
                        onClick={this.onChangeCheckbox}
                      />
                      <ShowLabel htmlFor="checkbox" activeTheme={activeTheme}>
                        Show Password
                      </ShowLabel>
                    </div>

                    <Button type="submit">Login</Button>
                    {showSubmitError && (
                      <ErrorMessage>*{errorMsg}</ErrorMessage>
                    )}
                  </Container>
                </form>
              </ShadowContainer>
            </LoginContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
