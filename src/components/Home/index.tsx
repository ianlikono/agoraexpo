import * as React from 'react';
import Cover from './Cover';
import TrendingShops from './TrendingShops/TrendingShops';

export interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Cover />
      <TrendingShops />
    </div>
  );
}
