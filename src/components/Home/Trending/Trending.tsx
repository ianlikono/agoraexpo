import Typography from '@material-ui/core/Typography';
import React from 'react';
import GroupCard from '../../ForumsCards/ForumCard';
import ItemCaraosel from '../../itemsCaraosel/ItemCaraosel';
import ShopCard from '../../ShopCard/ShopCard';
import UserCard from '../../UserCard/UserCard';

const Trending: React.FunctionComponent = () => {
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
        <div>
          <ItemCaraosel>
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
            <ShopCard />
          </ItemCaraosel>
        </div>
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
        <ItemCaraosel>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </ItemCaraosel>
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
              Popular Groups
            </Typography>
          </div>
        </div>
      </section>
      <section>
        <ItemCaraosel>
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </ItemCaraosel>
      </section>
    </>
  );
};

export default Trending;
