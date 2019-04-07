import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin: 10px auto 0 auto;
`;


export const Gallery = styled.div`
  display: flex;
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Details = styled.div`
  background: blue;
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;