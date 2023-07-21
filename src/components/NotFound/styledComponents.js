import styled from 'styled-components'

export const H = styled.h1`
  color: ${props => (props.activeTheme ? '#f9f9f9' : '#090909')};
  font-family: roboto;
`

export const P = styled.p`
  color: ${props => (props.activeTheme ? '#f9f9f9' : '#090909')};
  font-family: roboto;
`
