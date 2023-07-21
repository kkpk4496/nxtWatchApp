import styled from 'styled-components'

export const VideoContainer = styled.div`
  height: 100vh;
  width: 60vw;
  overflow-y: auto;
  background-color: ${props => (props.bgColor ? '#090909' : '#f9f9f9')};
  color: ${props => (props.color ? '#f9f9f9' : '#090909')};
  overflow: auto;
  padding: 20px 5px;
`
export const ParaEl = styled.p`
  font-size: 15px;
  padding-left: 20px;
  padding-bottom: ${props => props.padding};
  @media (min-width: 768px) {
    align-self: flex-start;
  }
  @media (max-width: 767px) {
    font-size: 13px;
  }
`
export const AttributesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 0;
  align-items: center;
  border-bottom: 2px solid ${props => props.color};
  margin: 0 10px;
`
export const ChannelContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`

export const ContentContainer = styled.div``

export const ImageEl = styled.img`
  height: 40px;
`
export const IconParas = styled.button`
  cursor: pointer;
  color: ${props => props.iconColor};
  font-size: 15px;
  font-weight: 600;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
`
