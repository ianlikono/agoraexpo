import styled from 'styled-components';

export const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;


const OrderItemStyles = styled.li`
  box-shadow: ${props => props.theme.BoxShadow};
  background-color: ${props => props.theme.backgroundColor};
  list-style: none;
  padding: 2rem;
  border: 1px solid ${props => props.theme.offWhite};
  h2 {
    border-bottom: 2px solid red;
    margin-top: 0;
    font-size: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  p {
    font-size: 1.7rem;
  }
  .images {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    margin-top: 1rem;
    img {
      height: 200px;
      object-fit: cover;
      width: 100%;
    }
  }
  .order-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
    display: grid;
    grid-gap: 1rem;
    text-align: center;
    & > * {
      margin: 0;
      background: rgba(0, 0, 0, 0.03);
      padding: 1rem 0;
    }
    strong {
      display: block;
      margin-bottom: 1rem;
    }
  }
`;

export default OrderItemStyles;
