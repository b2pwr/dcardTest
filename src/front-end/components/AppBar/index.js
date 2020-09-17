import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Input from '../Input';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const CustomAppBar = ({ inputChange }) => {
  const classes = useStyles();
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
};

export default CustomAppBar;
