import styled from 'styled-components'

export const GamePara = styled.p`
  font-weight: bold;
  color: ${props => (props.color ? '#f9f9f9' : '#000000')};
`
export const GameContainer = styled.div`
  background-color: ${props => (props.activeTheme ? '#090909' : '#f9f9f9')};
`
