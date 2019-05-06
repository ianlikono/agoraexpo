import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
`;

export const CartItem = styled.div`
    display: flex;
    width: 100%;
    height: 150px;
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
    margin-top: 20px;
`;

export const ItemImg = styled.img`
    width: 30%;
    height: 100%;
    border-radius: 20%;
    object-fit: cover;
`;

export const ItemsDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ItemControls = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const DeleteItem = styled.div`
  position: absolute;
  right: -10px;
  top: 11px;
  color: red;
  cursor: pointer;
`;


export const TotalAmount = styled.h2`
  color: ${props => props.theme.colorTextDark};
  font-size: 3rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: bold;
`;