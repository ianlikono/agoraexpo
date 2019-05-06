import React, { useEffect, useState } from 'react';
import { fire } from '../../../firebase';
import AuthDialog from '../AuthDialog';

export interface CheckAuthProps {
  children: any;
}


function CheckAuth(props: CheckAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fire.auth().onAuthStateChanged(function (user: any) {
      if (user) {
        setIsAuthenticated(true);
        setIsModalOpen(false);
      } else {
        setIsAuthenticated(false);
        setIsModalOpen(true);
      }
    });
  }, []);

  function closeModal() {
    setIsModalOpen(false);
  }
  if (!isAuthenticated) {
    return (
      <>
        <AuthDialog open={isModalOpen} close={closeModal} />
      </>
    )
  }
  return (
    props.children
  );
}

export default CheckAuth;
