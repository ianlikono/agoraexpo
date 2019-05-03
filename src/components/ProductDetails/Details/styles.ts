/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 80%;
  justify-content: center;
  margin: 20px;
`;

export const ShareIconsWrapper = styled.div`
  color: #f44336;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const ShareIcon = styled.div`
  cursor: pointer;
`;

export const HeaderTitle = styled.div`
  text-align: center;
`;

export const DescriptionWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
`;

export const RatingsWrapper = styled.div`
  display: flex;
  align-self: end;
  align-items: center;
`;

export const VariantWrapper = styled.div`
  margin-top: 10px;
  align-self: end;
  width: 100%;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const ProductDescription = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  font-size: 1.5rem;
`;
