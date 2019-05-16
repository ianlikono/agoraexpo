// eslint-disable-next-line no-unused-vars
import { NextContext } from 'next';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';
import ProductDetails from '../src/components/ProductDetails/index';
import MeProvider from '../src/contexts/Me';
import { productQuery } from '../src/graphql/queries';
import { initGA, logPageView } from "../utils/analytics";

export interface queryProps {
  id: String;
}

class Product extends React.Component<queryProps> {
  static getInitialProps({ query: { id, shopName } }: NextContext) {
    return { id, shopName };
  }
  componentDidMount() {
    //@ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA();
      //@ts-ignore
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  render() {
    const { id } = this.props;
    return (
      <MeProvider>
        <Query query={productQuery} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <>
                <Helmet>
                  <title>{`${data.product && data.product.title}`}</title>
                  <link rel="canonical" href={`https://agoraexpo.com/product/${id}`} />
                  <meta name="description" content={data.product && data.product.description} />
                  {/* Google / Search Engine Tags */}
                  <meta itemProp="name" content={data.product && data.product.title} />
                  <meta itemProp="description" content={data.product && data.product.description} />
                  <meta itemProp="image" content={data.product && data.product.images[0].imageUrl} />
                  {/* Facebook Meta Tags */}
                  <meta property="og:title" content={data.product && data.product.title} />
                  <meta property="og:description" content={data.product && data.product.description} />
                  <meta property="og:image" content={data.product && data.product.images[0].imageUrl} />
                  <meta property="og:url" content={`https://agoraexpo.com/product/${id}`} />
                  <meta property="og:site_name" content="AgoraExpo" />
                  {/* twitter Meta Tags */}
                  <meta name="twitter:title" content={data.product && data.product.title} />
                  <meta name="twitter:description" content={data.product && data.product.description} />
                  <meta name="twitter:image" content={data.product && data.product.images[0].imageUrl} />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:image:alt" content="AgoraExpo" />
                </Helmet>
                <ProductDetails productId={id} product={data.product} />
              </>
            );
          }}
        </Query>
      </MeProvider>
    );
  }
}

export default Product;
