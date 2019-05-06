import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UserAvatar = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const FullName = styled.h2`
  font-size: 2.6rem;
  line-height: 3rem;
  margin-top: 0;
  margin-bottom: 0;
`;

export const Username = styled.h3`
  font-size: 1.6rem;
  line-height: 1.5rem;
  margin-top: 0;
  margin-bottom: 0;
  color: ${props => props.theme.colorTextLight};
`;
