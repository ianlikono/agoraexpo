/* eslint-disable react/destructuring-assignment */
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';
import { Carousel } from 'react-responsive-carousel';
import PlusIcon from '../src/components/PlusIcon/PlusIcon';
import Sections from '../src/components/shopProductsSections';
import MeProvider from '../src/contexts/Me';
import { GetShop } from '../src/graphql/queries';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 0.05,
  },
});

class Shop extends React.PureComponent {
  state = {};


  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    const id = this.props.query.id.toString();
    return (
      <Query query={GetShop} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          return (
            <MeProvider>
              <Helmet
                title={`${data.shop.name && data.shop.name}`}
                meta={[{ name: "description", content: data.shop && data.shop.description }]}
              />
              <div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 5, right: 10, zIndex: 10 }}>
                    <PlusIcon toolTipTitle="Add Images" fabSize="medium" />
                  </div>
                  <div>
                    <Carousel showThumbs={false} infiniteLoop autoPlay>
                      <div style={{ height: '50vh', width: '100%' }}>
                        <img
                          style={{ height: '100%' }}
                          src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                      </div>
                      <div style={{ height: '50vh', width: '100%' }}>
                        <img
                          style={{ height: '100%' }}
                          src="https://images.unsplash.com/photo-1468582232004-7f2dc42c8e2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                      </div>
                      <div style={{ height: '50vh', width: '100%' }}>
                        <img
                          style={{ height: '100%' }}
                          src="https://images.unsplash.com/photo-1424296308064-1eead03d1ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        />
                      </div>
                    </Carousel>
                  </div>
                </div>
              </div>
              <Sections owners={data.shop.owners} shopId={id} />
            </MeProvider>
          );
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(Shop);
