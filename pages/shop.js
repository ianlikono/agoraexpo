/* eslint-disable react/destructuring-assignment */
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { Carousel } from 'react-responsive-carousel';
import PlusIcon from '../src/components/PlusIcon/PlusIcon';
import Sections from '../src/components/shopProductsSections';
import MeProvider, { MeConsumer } from '../src/contexts/Me';
import { addShopCoverImage, deleteShopCoverImage } from '../src/graphql/mutations';
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


  onUploadImageClick = async (imageCreate) => {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('accept', 'image/*');
    fileSelector.click();
    fileSelector.onchange = async () => {
      const file = fileSelector.files[0];
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'shop-covers');
      const res = await fetch('https://api.cloudinary.com/v1_1/doelo01na/image/upload', {
        method: 'POST',
        body: data,
      });
      const uploadedFile = await res.json();

      const response = await imageCreate({
        variables: {
          shopId: this.props.query.id.toString(),
          imageUrl: uploadedFile.secure_url,
          largeImageUrl: uploadedFile.eager[0].secure_url
        },
        refetchQueries: [
          {
            query: GetShop,
            variables: { id: this.props.query.id.toString() }
          },
        ],
      })
    };
  }

  onDeleteImageClicked = async (image, imageDelete) => {
    const response = await imageDelete({
      variables: {
        imageId: image
      },
      refetchQueries: [
        {
          query: GetShop,
          variables: { id: this.props.query.id.toString() }
        },
      ],
    })
  }

  renderAddImages = (value, owners) => {
    const isShopOwner = value.isShopOwner(owners);
    if(isShopOwner) {
      return(
        <>
          <Mutation mutation={addShopCoverImage}>
            {(imageCreate, { loading, error }) => (
              <>
                <div onClick={() => this.onUploadImageClick(imageCreate)} style={{ position: 'absolute', top: 5, right: 10, zIndex: 10 }}>
                  <PlusIcon toolTipTitle="Add Shop Cover Images" fabSize="medium" />
                </div>
              </>
            )}
           </Mutation>
        </>
      )
    }
  }

  renderCaraoselImages = (value, images, owners) => {
    const isShopOwner = value.isShopOwner(owners);
    if(images.length > 0) {
      return images.map((image, i) => (
        <div key={i} style={{ height: '50vh', width: '100%' }}>
          <img
            id={i}
            style={{ height: '100%' }}
            src={image.largeImageUrl}
          />
          <>
         {isShopOwner ? (<Mutation mutation={deleteShopCoverImage}>
              {(imageDelete, { loading, error }) => (
              <div onClick={() => this.onDeleteImageClicked(image.id, imageDelete)} style={{ position: 'absolute', bottom: 5, right: 10, zIndex: 10 }}>
                <Fab size="medium" color="primary" aria-label="Delete">
                  <DeleteIcon />
                </Fab>
              </div>
              )}
         </Mutation>) : null}
          </>
        </div>
      ))
    }else {
      return null;
    }
  }

  render() {
    const id = this.props.query.id.toString();
    return (
      <Query query={GetShop} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          return (
            <MeProvider>
              <Helmet>
                  <title>{`${data.shop.name && data.shop.name}`}</title>
                  <link rel="canonical" href={`https://agoraexpo.com/shop/${id}`} />
                  <meta name="description" content={data.shop && data.shop.description} />
                  {/* Google / Search Engine Tags */}
                  <meta itemProp="name" content={`${data.shop.name && data.shop.name}`} />
                  <meta itemProp="description" content={data.shop && data.shop.description} />
                  <meta itemProp="image" content="https://res.cloudinary.com/doelo01na/image/upload/v1556859500/static/logos/agoraexpobanner.png" />
                  {/* Facebook Meta Tags */}
                  <meta property="og:title" content={`${data.shop.name && data.shop.name}`} />
                  <meta property="og:description" content={data.shop && data.shop.description} />
                  <meta property="og:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
                  <meta property="og:url" content={`https://agoraexpo.com/shop/${id}`} />
                  <meta property="og:site_name" content="AgoraExpo" />
                  {/* twitter Meta Tags */}
                  <meta name="twitter:title" content={`${data.shop.name && data.shop.name}`} />
                  <meta name="twitter:description" content={data.shop && data.shop.description} />
                  <meta name="twitter:image" content="https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_630,q_auto/v1556859500/static/logos/agoraexpobanner.png" />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:image:alt" content="AgoraExpo" />
                </Helmet>
              <div>
              <MeConsumer>
                {value => {
                    return (
                      <div style={{ position: 'relative' }}>
                        {this.renderAddImages(value, data.shop.owners)}
                        <div>
                          <Carousel showThumbs={false} infiniteLoop autoPlay>
                            {this.renderCaraoselImages(value, data.shop.images, data.shop.owners)}
                          </Carousel>
                        </div>
                      </div>
                    )
                  }
                }
                </MeConsumer>
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
