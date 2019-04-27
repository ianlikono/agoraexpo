import React from 'react';
import './styles.css';

export interface LoaderProps { }

function Loader(props: LoaderProps) {
  return (
    <>
      <div className="container">
        <div className="item"></div>
      </div>
    </>
  );
}

export default Loader;
