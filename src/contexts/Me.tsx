import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

export interface MeProps {
  children: any;
}

const Me = gql`
    query me {
        me {
            id
            name
            username
        }
    }
`;

//@ts-ignore
export const MeContext = React.createContext();


function MeProvider(props: MeProps) {
  const { children } = props;

  return (
    <>
      <Query query={Me}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) console.log(error);
          function isShopOwner(owners: any) {
            if(data.me) {
              return owners.filter((owner: any) => {
                return owner.id == data.me.id
              }).length > 0;
            } else {
              return false
            }
          }
          return (
            <MeContext.Provider
              value={{
                me: data.me,
                isShopOwner: isShopOwner,
              }}
            >
              {children}
            </MeContext.Provider>
          )
        }}
      </Query>
    </>
  );
}

const MeConsumer = MeContext.Consumer;

export default MeProvider;
export { MeConsumer };



