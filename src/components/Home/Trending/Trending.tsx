import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import Link from 'next/link';
import React from 'react';
import { Query } from 'react-apollo';
import ForumCard from '../../ForumsCards/ForumCard';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import ShopCard from '../../ShopCard/ShopCard';
import UserCard from '../../UserCard/UserCard';

export const getForums = gql`
  query getForums($limit: Int) {
    getForums(limit: $limit) {
      id
      avatarPic
      name
    }
  }
`;

const getUsers = gql`
  query getUsers($limit: Int) {
  getUsers(limit: $limit) {
    id
    username
    profilePic
    shops {
      id
      name
    }
  }
}
`;

const getShops = gql`
  query getShops($limit: Int) {
  getShops(limit: $limit) {
    id
    name
    images {
      imageUrl
    }
  }
}
`;


const Trending: React.FunctionComponent = () => {

  function renderShops(shops: any) {
    return shops.map((shop: { id: any; name: string; images: { imageUrl: string; }[]; }) => {
      return (
        <Link key={shop.id} href={`/shop/${shop.id}`}>
          <a>
            <ShopCard shopName={shop.name} coverPic={shop.images.length ? shop.images[0].imageUrl : "https://res.cloudinary.com/doelo01na/image/upload/v1555589550/static/photo-1489549132488-d00b7eee80f1.jpg"} avatarPic={shop.images.length ? shop.images[0].imageUrl : "https://res.cloudinary.com/doelo01na/image/upload/v1555589550/static/photo-1489549132488-d00b7eee80f1.jpg"} />
          </a>
        </Link>
      )
    })
  }

  function renderUsers(users: any) {
    return users.map((user: { id: string | number | undefined; username: string; shops: { length: Number; }; profilePic: any; }) => {
      return (
        <Link key={user.id} href={`/u/${user.username}`}>
          <a>
            <UserCard username={user.username} shops={user.shops.length} profilePic={user.profilePic ? user.profilePic : null} />
          </a>
        </Link>
      )
    })
  }

  function renderForums(forums: any) {
    return forums.map((forum) => {
      return (
        <Link key={forum.id} href={`/f/${forum.name}`}>
          <a>
            <ForumCard key={forum.id} avatarPic={forum.avatarPic} name={forum.name} />
          </a>
        </Link>
      )
    })
  }
  return (
    <>
      <section>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <Typography variant="h4" align="center">
              Popular Shops
            </Typography>
          </div>
        </div>
      </section>
      <section>
        <Query query={getShops} variables={{ limit: 10 }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <>
                <div>
                  <ItemCaraosel>
                    {renderShops(data.getShops)}
                  </ItemCaraosel>
                </div>
              </>
            );
          }}
        </Query>
      </section>
      <section>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <Typography variant="h4" align="center">
              Popular Shop Owners
            </Typography>
          </div>
        </div>
      </section>
      <section>
        <Query query={getUsers} variables={{ limit: 10 }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <>
                <ItemCaraosel>
                  {renderUsers(data.getUsers)}
                </ItemCaraosel>
              </>
            );
          }}
        </Query>
      </section>
      <section>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <Typography variant="h4" align="center">
              Popular Forums
            </Typography>
          </div>
        </div>
      </section>
      <section>
        <Query query={getForums} variables={{ limit: 10 }}>
          {({ loading, error, data }) => {
            console.log("TCL: data", data)
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <>
                <ItemCaraosel>
                  {renderForums(data.getForums)}
                </ItemCaraosel>
              </>
            );
          }}
        </Query>
      </section>
    </>
  );
};

export default Trending;
