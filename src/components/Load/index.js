import Loader from 'react-loader-spinner'

const Load = () => (
  <div className="loader-container" data-testid="loader">
    <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
  </div>
)

export default Load
