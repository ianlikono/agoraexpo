import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.colorTextLight};
  background: ${props => (props.highlighted ? props.theme.colorTextDark : props.theme.colorTextLight)};
  padding: 1rem;
  font-size: 1.5rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.colorTextLight : 'white')};
  img {
    margin-right: 10px;
    width: 5rem;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px green;
  }
  to {
    box-shadow: 0 0 10px 1px green;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    color: inherit;
    width: 100%;
    background-color: inherit;
    width: 100%;
    padding: 10px;
    padding-left: 5rem;
    border: none;
    font-size: 2rem;
    &:active {
      border: none;
  }
  &:focus {
      border: none;
      outline: none;
    }
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };

