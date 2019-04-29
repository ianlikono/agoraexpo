import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;


export const CardHeader = styled.div`
  margin: 0 0.8rem 0.8rem;
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

export const ForumAvatar = styled.div`
  flex: 0 0 auto;
  cursor: pointer;
`;

export const ForumAvatarImage = styled.img`
  width: 4rem;
  height: 4rem;
  margin-right: 2rem;
  vertical-align: middle;
  background-color: rgb(0, 43, 54);
  border-radius: 100%;
  background-size: cover;
`;

export const HeaderTitles = styled.div`
  flex: 1 1 auto;
`;

export const HeaderTitlesContent = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
  align-items: center;
  color: inherit;
  display: inline;
`;

export const ForumTitle = styled.div`
  display: inline-block;
  flex: 0 0 auto;
  font-weight: bold;
  color: rgb(28, 28, 28);
  line-height: 2rem;
  vertical-align: baseline;
  text-decoration: none;
  font-size: 1.6rem;
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colorGreenPrimary};
  }
`;

export const PostedBy = styled.span`
  color: ${props => props.theme.colorTextLight};
  margin-left: 1rem;
`;

export const UserText = styled.span`
  color: ${props => props.theme.colorTextLight};
  display: inline-block;
  margin-right: 1rem;
  margin-left: 1rem;
  text-decoration: none;
  font-size: 1.5rem;

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colorGreenPrimary};
  }
`;

export const PostedTime = styled.span`
    font-size: 1.5rem;
    text-decoration: none;
    color: ${props => props.theme.colorTextLight};
    display: inline-block;
`;

export const ForumWrapper = styled.div`
  display: flex;
`;

export const VotingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 1.5rem;
  align-items: center;
`;

export const VoteIcon = styled.div`
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.colorGreenPrimary};
  }
`;
export const CommentIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorTextLight};
  &:hover {
    color: ${props => props.theme.colorGreenPrimary};
  }
`;

export const CommentCountText = styled.span`
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin-left: 0.5rem;
`;

export const VoteCountText = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.5rem;
`;
