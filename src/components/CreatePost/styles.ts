import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 70%;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  flex: 1 1 0%;
  border-bottom: 1px solid #fff;
`;

export const ForumSearch = styled.div`
  min-width: 30rem;
  max-width: 40%;
`;

export const TabWrapper = styled.div`
  height: fill-available;
`;

export const SubmitWrapper = styled.div`
  position: relative;
`;

export const SubmitButton = styled.div`
  position: absolute;
  right: 0;
`;
