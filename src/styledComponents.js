import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${props => (props.activeTheme ? '#181818' : '#f9f9f9')};
`
