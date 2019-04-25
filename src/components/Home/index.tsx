import * as React from 'react';
import Cover from './Cover';
import Trending from './Trending/Trending';

export interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Cover />
      <Trending />
    </div>
  );
}
