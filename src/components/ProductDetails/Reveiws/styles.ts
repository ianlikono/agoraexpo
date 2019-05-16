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
  align-items: center;
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

export const ReviewParagraph = styled.p`
  font-size: 1.6rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  line-height: 1.17;
  letter-spacing: 0.00735em;
`;

