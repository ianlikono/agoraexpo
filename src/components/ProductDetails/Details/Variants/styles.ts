/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 10px;
`;

export const SelectedColor = styled.div`
  background: ${props => {
      return props.SelectedColor
  }};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

export const Popover = styled.div`
    position: 'absolute',
    zIndex: '2',
`;

export const Cover = styled.div`
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
`;

export const ColorWrapper = styled.div`
  margin:0 5px 0 5px;
  position: relative;
`;

export const DeleteColor = styled.div`
  position: absolute;
  right: -8px;
  top: -8px;
  color: red;
  cursor: pointer;
`;