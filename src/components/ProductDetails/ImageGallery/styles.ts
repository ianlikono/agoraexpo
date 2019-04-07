import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ImagesPreview = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 15%;
 @media (max-width: 900px) {
    order: 2;
    width: 90%;
    justify-content: space-evenly;
}
`;

export const PreviewsList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    height: 80vh;
    @media (max-width: 900px) {
        display: flex;
        justify-content: space-evenly;
        height: 100%;
    }
`;

export const ActiveImage = styled.div`
  width: 80%;
  @media (max-width: 900px) {
    order: 1;
    width: 90%;
    margin: 0 auto;
}
`;

export const DispayImage = styled.img`
  width: 100%;
  height: 80vh;
  background-size: cover;
`;

export const PreviewImage = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
`;

