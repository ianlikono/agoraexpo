// eslint-disable-next-line no-unused-vars
// @ts-ignore
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { NextContext } from 'next';
import React from 'react';
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Orders from '../src/components/orders';
import Forums from '../src/components/User/Forums';
import OverviewComponent from '../src/components/User/Overview';
import UserPosts from '../src/components/User/posts';
import Shops from '../src/components/User/shops';
import MeProvider, { MeConsumer } from '../src/contexts/Me';
import { getUserDetails } from '../src/graphql/queries';
import { initGA, logPageView } from "../utils/analytics";

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  margin: 2rem auto;
`;

const Overview = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
`;

const TabsWrapper = styled.div`
  display: flex;
  width: 80%;
`;

export interface ForumProps {
  username: any;
  tab: any;
  classes: any;
}

function TabContainer(props: any) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});



class ForumPage extends React.Component<ForumProps> {
  static getInitialProps({ query: { username } }: NextContext) {
    return { username };
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
  state = {
    tabsValue: 0,
  };

  handleChange = (event, value) => {
    this.setState({ tabsValue: value });
  };


  render() {
    const { tabsValue } = this.state;
    const { username, classes } = this.props;
    return (
      <>
        <Query query={getUserDetails} variables={{ username }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) console.log(error);
            return (
              <>
                <Helmet>
                  <title>{`${data.getUser && data.getUser[0].username}`}</title>
                  <link rel="canonical" href={`https://agoraexpo.com/u/${username}`} />
                  <meta name="description" content={data.getUser && `${data.getUser[0].username} has ${data.getUser[0].shops.length} shops`} />
                  {/* Google / Search Engine Tags */}
                  <meta itemProp="name" content={data.getUser && data.getUser[0].username} />
                  <meta itemProp="description" content={data.getUser && `${data.getUser[0].username} has ${data.getUser[0].shops.length} shops`} />
                  <meta itemProp="image" content={data.getUser && data.getUser[0].profilePic} />
                  {/* Facebook Meta Tags */}
                  <meta property="og:title" content={data.getUser && data.getUser[0].username} />
                  <meta property="og:description" content={data.getUser && `${data.getUser[0].username} has ${data.getUser[0].shops.length} shops`} />
                  <meta property="og:image" content={data.getUser && data.getUser[0].profilePic} />
                  <meta property="og:url" content={`https://agoraexpo.com/u/${username}`} />
                  <meta property="og:site_name" content="AgoraExpo" />
                  {/* twitter Meta Tags */}
                  <meta name="twitter:title" content={data.getUser && data.getUser[0].username} />
                  <meta name="twitter:description" content={data.getUser && `${data.getUser[0].username} has ${data.getUser[0].shops.length} shops`} />
                  <meta name="twitter:image" content={data.getUser && data.getUser[0].profilePic} />
                  <meta name="twitter:card" content="summary_large_image" />
                  <meta name="twitter:image:alt" content="AgoraExpo" />
                </Helmet>
                <MeProvider>
                  <MeConsumer>
                    {value => {
                      return (
                        <Wrapper>
                          <Overview>
                            <OverviewComponent username={username} />
                          </Overview>
                          <TabsWrapper>
                            <div className={classes.root}>
                              <AppBar position="static" color="default">
                                <Tabs
                                  value={tabsValue}
                                  onChange={this.handleChange}
                                  variant="scrollable"
                                  scrollButtons="on"
                                  indicatorColor="primary"
                                  textColor="primary"
                                >
                                  <Tab label="Forums" />
                                  <Tab label="Posts" />
                                  <Tab label="Shops" />
                                  {value.me && value.me.username == username ? <Tab label="Orders" /> : null}
                                </Tabs>
                              </AppBar>
                              {tabsValue === 0 && <TabContainer><Forums username={username} /></TabContainer>}
                              {tabsValue === 1 && <TabContainer><UserPosts username={username} /></TabContainer>}
                              {tabsValue === 2 && <TabContainer><Shops username={username} /></TabContainer>}
                              {tabsValue === 3 && value.me && value.me.username == username && <TabContainer><Orders /></TabContainer>}
                            </div>
                          </TabsWrapper>
                        </Wrapper>
                      )
                    }
                    }
                  </MeConsumer>
                </MeProvider>
              </>
            )
          }}
        </Query>
      </>
    );
  }
}
export default withStyles(styles)(ForumPage);

