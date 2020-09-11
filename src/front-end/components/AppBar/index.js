import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Input from '../Input';

const styles = theme => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

class CustomAppBar extends React.Component {
  render() {
    const {
      classes,
      inputChange,
    } = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Github Repositories Search
          </Typography>
          <Input inputChange={inputChange} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
