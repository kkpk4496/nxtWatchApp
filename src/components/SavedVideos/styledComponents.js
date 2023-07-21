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
export const UnSavedVideosDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.color};
  @media (max-width: 767px) {
    padding-left: 20px;
  }
`
export const NoVideosImageEl = styled.img`
  @media (max-width: 767px) {
    width: 100%;
    object-fit: contain;
    padding-top: 5%;
  }
  @media (min-width: 768px) {
    width: 50%;
    object-fit: contain;
    padding: 30px 40px;
  }
`
export const NotFoundHead = styled.h2``

export const NotFoundPara = styled.p``
