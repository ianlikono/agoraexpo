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
              <ShopCard coverPic={shop.images.length ? shop.images[0].imageUrl : "https://res.cloudinary.com/doelo01na/image/upload/v1555589550/static/photo-1489549132488-d00b7eee80f1.jpg"} avatarPic={shop.images.length ? shop.images[0].imageUrl : "https://res.cloudinary.com/doelo01na/image/upload/v1555589550/static/photo-1489549132488-d00b7eee80f1.jpg"} shopName={shop.name} />
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
          if (!data.getUser[0].shops.length) {
            return (
              <h1 style={{ display: 'flex', justifyContent: 'center' }}>No Shops Available</h1>
            )
          }
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
