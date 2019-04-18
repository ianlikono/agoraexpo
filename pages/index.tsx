import * as React from 'react';
import Home from '../src/components/Home';

export interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;
