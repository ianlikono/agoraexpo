import React from 'react';
import SectionOne from './Sections/SectionOne';
import AllProducts from './Sections/AllProducts';

const Sections = (props) => {
  return (
    <>
      <SectionOne shopId={props.shopId}/>
      <AllProducts shopId={props.shopId}/>
    </>
  );
};

export default Sections;
