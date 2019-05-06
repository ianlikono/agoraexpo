// eslint-disable-next-line no-unused-vars
// @ts-ignore
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { NextContext } from 'next';
import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import User from '../src/components/User';
import OverviewComponent from '../src/components/User/Overview';
import MeProvider, { MeConsumer } from '../src/contexts/Me';

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  margin: 2rem auto;
`;

const Overview = styled.div`
  display: flex;
  width: 30%;
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
  state = {
    tabsValue: 0,
  };

  handleChange = (event, value) => {
    this.setState({ tabsValue: value });
  };


  render() {
    const { tabsValue } = this.state;
    const { username, classes } = this.props;
    console.log('username', username);
    return (
      <>
        <Helmet
          title={`${username}`}
          meta={[{ name: "description", content: username }]} />
        <MeProvider>
          <MeConsumer>
            {value => {
              return (
                <Wrapper>
                  <Overview>
                    <OverviewComponent username={username}/>
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
                      {tabsValue === 0 && <TabContainer><User /></TabContainer>}
                      {tabsValue === 1 && <TabContainer>Item Two</TabContainer>}
                      {tabsValue === 2 && <TabContainer>Item Three</TabContainer>}
                      {tabsValue === 3 && value.me && value.me.username == username && <TabContainer>Item Four</TabContainer>}
                    </div>
                  </TabsWrapper>
                </Wrapper>
              )
            }
            }
          </MeConsumer>
        </MeProvider>
      </>
    );
  }
}
export default withStyles(styles)(ForumPage);
