import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import { getUserDetails } from '../../../graphql/queries';
import ShopCard from '../../ShopCard/ShopCard';
import { Wrapper } from './styles';

export interface ShopsProps {
  username: any;
}

function Shops(props: ShopsProps) {
  const { username } = props;
  function renderShops(shops) {
    return shops.map((shop) => {
      return (
        <>
          <Link href={`/shop/${shop.id}`}>
            <a>
              <ShopCard coverPic={shop.images[0].imageUrl} avatarPic={shop.images[0].imageUrl} shopName={shop.name} />
            </a>
          </Link>
        </>
      )
    })
  }
  return (
    <>
      <Query query={getUserDetails} variables={{ username }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) console.log(error);
          console.log(data);
          return (
            <Wrapper>
              {renderShops(data.getUser[0].shops)}
            </Wrapper>
          )
        }}
      </Query>
    </>
  );
}

export default Shops;
