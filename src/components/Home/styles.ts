import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 80vh;
`;

export const CoverImage = styled.div`
  width: 100%;
  height: 100%;
  background: url('https://res.cloudinary.com/doelo01na/image/upload/v1555589569/static/tom-sodoge-61701-unsplash.jpg')
    no-repeat center center fixed;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  position: relative;
`;

export const CoverText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CoverH1 = styled.h1`
  font-size: 56px;
  line-height: 56px;
  font-weight: 600;
  margin: 1%;
  text-align: center;
  @media (max-width: 1240px) {
    font-size: 38px;
  }
  @media (max-width: 850px) {
    font-size: 29px;
  }
  @media (max-width: 640px) {
    font-size: 22px;
  }
`;

export const CoverH3 = styled.h3`
  margin: 1%;
  font-size: 26px;
  line-height: 32px;
  font-weight: 300;
  text-align: center;
  @media (max-width: 1240px) {
    font-size: 26px;
  }
  @media (max-width: 850px) {
    font-size: 22px;
  }
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
