import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 250px;
  min-height: 300px;
  border-radius: 50px;
  max-width: 250px;
  margin: 0px 35px 0px 35px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const CardWrapper = styled.div`
  height: 300px;
  width: 100%;
  border-radius: 50px;
  position: relative;
`;

export const ShopCover = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50px;
  background-size: cover;
  opacity: 0.5;
  object-fit: cover;
  vertical-align: middle;
  filter: brightness(25%);
`;

export const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 10%;
  width: 100%;
`;

export const ShopAvatar = styled.img`
  vertical-align: middle;
  border-style: none;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14),
      0px 5px 22px 4px rgba(0, 0, 0, 0.12);
  }
`;

export const ShopName = styled.h3`
  font-size: 26px;
  line-height: 32px;
  font-weight: 300;
  text-align: center;
  color: #fff;
`;
