import {ErrorContainer, Para, Head, Button, ErrorImg} from './styledComponents'

const ErrorMessage = props => {
  const {refresh, activeTheme} = props

  const refreshPage = () => {
    refresh()
  }

  return (
    <ErrorContainer>
      {activeTheme ? (
        <ErrorImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
          alt="failure view"
        />
      ) : (
        <ErrorImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
        />
      )}

      <Head>Oops! Something Went Wrong</Head>
      <Para>
        We are having some trouble to complete your request. Please try again.
      </Para>
      <Button onClick={refreshPage}>Retry</Button>
    </ErrorContainer>
  )
}

export default ErrorMessage
