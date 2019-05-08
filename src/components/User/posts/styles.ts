import styled from 'styled-components';


export const Wrapper = styled.div`
  margin: 1.5rem auto;
`;

export const ChildrenWrapper = styled.div`
  font-size: 1.5rem;
`;

export const ItemTitle = styled.h2`
  display: inline;
  overflow-wrap: break-word;
  color: ${props => props.theme.colorTextDark};
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 2.2rem;
  padding-right: 0.5rem;
`;

export const ItemContent = styled.p`
  margin-top: 2rem;
  font-size: 1.6rem;
`;
