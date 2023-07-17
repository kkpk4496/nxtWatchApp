import styled from 'styled-components'

export const TrendPara = styled.p`
  font-weight: bold;
  color: ${props => (props.activeTheme ? '#f9f9f9' : '#000000')};
`
export const SpanDot = styled.span`
  color: ${props => (props.activeTheme ? '#f9f9f9' : '#000000')};
  font-size: 50px;
  margin-left: 5px;
  text-align: right;
`
