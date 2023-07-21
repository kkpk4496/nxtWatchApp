import styled from 'styled-components'

export const Banner = styled.div`
  margin: 30px;
  padding-left: 15px;
  margin-bottom: 0px;
  height: 300px;
  width: 70vw;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  display: ${props => (props.outline ? 'none' : 'flex')};
  flex-direction: column;
  align-items: flex-start;
  border: none;
`
export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => (props.activeTheme ? '#181818' : '#f1f1f1')};
  width: 75vw;
`
export const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    padding: 25px;
    padding-top: 50px;
  }
`
export const ErrorImg = styled.img`
  width: 35%;
  object-fit: contain;
  @media (max-width: 767px) {
    width: 50%;
  }
`
export const Head = styled.h1``

export const Para = styled.p``

export const Button = styled.button`
  background-color: #4f46e5;
  width: 100px;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  font-weight: 600;
`
export const SearchInput = styled.input`
  padding: 7px;
  width: 400px;
  outline: none;
  background-color: ${props => (props.activeTheme ? '#181818' : '')};
  border: ${props => (props.activeTheme ? '1px solid #7e858e' : '')};
`
export const SearchButton = styled.button`
  padding: 6px;
  width: 70px;
  outline: none;
  cursor: pointer;
  color: ${props => (props.activeTheme ? '#f8f8f8' : '')};
  background-color: ${props => (props.activeTheme ? '#181818' : '')};
  border: ${props => (props.activeTheme ? '1px solid #7e858e' : '')};
`
export const NamePara = styled.p`
  color: ${props => (props.activeTheme ? '#f8f8f8' : '')};
`

export const BannerPara = styled.p`
  font-size: 24px;
  font-weight: 400;
  color: #0f0f0f;
  text-align: left;
  display: ${props => (props.outline ? 'none' : '')};
`
