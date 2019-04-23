import styled from 'styled-components';

export const Wrapper = styled.div`
  border-radius: 50px;
  max-width: 200px;
  min-height: 300px;
  margin: 0px 35px 0px 35px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const UserAvatar = styled.img`
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

export const UserNameText = styled.h4`
  color: #000;
  font-size: 20px;
  font-weight: 300;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const UserShops = styled.p`
  font-weight: 100;
  color: #f44336;
  font-size: 16px;
  margin: 0;
`;
