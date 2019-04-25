import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import React, { useRef } from 'react';
import DropDown from '../../DropDown';
import PlusIcon from '../../PlusIcon/PlusIcon';
import { CategoryText } from './styles';

export interface AddProps { }

function Add(props: AddProps) {
  const anchorEl = useRef(null);
  const [open, setOpen] = React.useState(false);

  function handleAddToggle() {
    setOpen(!open);
  }

  function handleAddClose(event: any) {
    // @ts-ignore
    if (anchorEl.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <>
      <div role="button" ref={anchorEl} aria-owns={open ? 'menu-list-grow' : undefined} aria-haspopup="true"
        onClick={handleAddToggle}>
        <PlusIcon toolTipTitle="Create" fabSize="small" />
      </div>
      <DropDown anchorEl={anchorEl} handlePopupClose={handleAddClose} open={open}>
        <Link href="/new-shop">
          <a>
            <MenuItem onClick={handleAddClose}>
              <CategoryText>New Shop</CategoryText>
            </MenuItem>
          </a>
        </Link>
        <Link href="/new-forum">
          <a>
            <MenuItem onClick={handleAddClose}>
              <CategoryText>New Forum</CategoryText>
            </MenuItem>
          </a>
        </Link>
      </DropDown>
    </>
  );
}

export default Add;
