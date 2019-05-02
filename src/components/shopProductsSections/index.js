import React from 'react';
import AllProducts from './Sections/AllProducts';
import SectionOne from './Sections/SectionOne';

const Sections = (props) => {
  return (
    <>
      <SectionOne shopId={props.shopId}/>
      <AllProducts shopId={props.shopId} owners={props.owners} />
    </>
  );
};

export default Sections;
