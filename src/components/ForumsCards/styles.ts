import styled from 'styled-components';

// background: ${props => {
//   return props.SelectedColor
// }};

export const Wrapper = styled.div`
  border-radius: 50px;
  max-width: 200px;
  min-height: 200px;
  margin: 0px 35px 0px 35px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-image: ${props => {
    return `url(${props.groupCover})`;
  }};
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.05);
  background-clip: content-box;
  background-size: cover;
  position: relative;
`;

export const GroupCardGradient = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: transparent;
  background-image: linear-gradient(
    rgba(15, 20, 31, 0) 0,
    rgba(15, 20, 31, 0.1) 25%,
    rgba(15, 20, 31, 0.8) 100%
  );
`;

export const GroupName = styled.h4`
  color: #fff;
  font-size: 25px;
  font-weight: 500;
  position: absolute;
  bottom: 10px;
  margin: 0;
  text-align: center;
`;
