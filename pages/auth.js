import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Helmet } from "react-helmet";
import LoginForm from '../src/components/Auth/LoginForm';
import SignUpForm from '../src/components/Auth/SignUpForm';
import { initGA, logPageView } from "../utils/analytics";

function TabContainer(props) {
  const { children } = props;
  return (
    <Paper elevation={1}>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    </Paper>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class Auth extends React.PureComponent {
  state = {
    value: 0,
  };

  componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  handleTabsChange = (event, value) => {
    this.setState({ value });
  };

  renderLoginForm = () => {
    return (
      <>
        <TabContainer>
          <LoginForm />
        </TabContainer>
      </>
    );
  };

  renderSignUpForm = () => {
    return (
      <>
        <TabContainer>
          <SignUpForm />
        </TabContainer>
      </>
    );
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <>
        <Helmet
          title='authentication'
          meta={[{ name: "authentication page", content: "authentication page" }]}
        />
        <div style={{ maxWidth: '600px', margin: '60px auto 0 auto' }}>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleTabsChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="LOGIN" />
                <Tab label="SIGN UP" />
              </Tabs>
            </AppBar>
            {value === 0 && this.renderLoginForm()}
            {value === 1 && this.renderSignUpForm()}
          </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Auth);
