import styled from 'styled-components';


export const Wrapper = styled.div`
   display: flex;
   width: 80%;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   @media (max-width: 900px) {
    width: 100%;
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const ReviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 30px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const ReviewDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ReviewContent = styled.div`
  width: 100%;
`;

