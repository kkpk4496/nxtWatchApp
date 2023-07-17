import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: roboto;
  /* background-color: #181818; */
`

export const ShadowContainer = styled.div`
  padding: 40px 20px;
  box-shadow: ${props =>
    props.LoginTheme ? '0px 0px 20px 5px #181818' : '0px 0px 20px 5px #c6c9cc'};
  @media screen and (max-width: 767px) {
    width: 90vw;
  }
`
export const Image = styled.img`
  width: 60%;
  margin-bottom: 20px;
  margin-left: 20%;
`
export const Input = styled.input`
  padding: 10px;
  outline: none;
  background-color: ${props => (props.activeBg ? '#181818' : '')};
  border: ${props => (props.activeBg ? '1px solid #94a3b8' : '')};
`
export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
  color: ${props => (props.activeBg ? '#f8f8f8' : '#94a3b8')};
`
export const Container = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
`
export const Button = styled.button`
  align-self: center;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  height: 40px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 2px;
  background-color: #3b82f6;
  border-radius: 8px;
  border: none;
  outline: none;
  cursor: pointer;
}
`
export const ErrorMessage = styled.p`
  align-self: start;
  font-size: 12px;
  margin-top: 3px;
  margin-bottom: 0px;
  font-family: 'Roboto';
  font-size: 12px;
  line-height: 16px;
  color: #ff0b37;
`
export const ShowLabel = styled.label`
  color: ${props => (props.activeTheme ? '#f8f8f8' : '#181818')};
`
