import styled from 'styled-components'

export const NavContainer = styled.ul`
  display: flex;
  flex-direction: column;
  min-width: 20%;
  list-style: none;
  margin-left: -40px;
`
export const Span = styled.span`
  margin-right: 30px;
  display: flex;
  align-items: center;
`
export const ListItems = styled.li`
  display: flex;
  align-items: center;
  transition: background-color 0.5s;
  background-color: ${props => (props.Highlight ? '#e2e8f0' : 'transparent')};
  color: ${props => (props.Highlight ? '#000000' : '#7e858e')};
  width: 20vw;
  padding-left: 10px;
  height: 50px;
`
