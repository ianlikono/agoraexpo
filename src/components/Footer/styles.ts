import styled from 'styled-components';

export const Wrapper = styled.footer`
  background-color: #f44336;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const FooterInnerWrapper = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
`;

export const FooderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const HeaderText = styled.h2`
  font-size: 20px;
  color: #fff;
  line-height: 32px;
  margin: 0;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  :hover {
    opacity: 0.7;
  }
  pointer-events: ${props => props.disabled && 'none'};
`;

export const Divider = styled.hr`
  width: 100%;
  color: #fff;
`;

export const LinkSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const LinkText = styled.h4`
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  :hover {
    opacity: 0.7;
  }
`;

export const FollowTitle = styled.h2`
  font-size: 18px;
  color: #fff;
  line-height: 32px;
  margin: 0;
  align-self: flex-start;
`;

export const SocialIcons = styled.div`
  display: flex;
  align-self: flex-start;
`;

export const ShareIcon = styled.div`
  cursor: pointer;
  margin-right: 10px;
  color: #fff;
`;

export const CopyRight = styled.p`
  font-size: 20px;
  color: #fff;
  font-family: Lato;
`;
