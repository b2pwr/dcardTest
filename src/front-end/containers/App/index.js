import React, { useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '../../components/AppBar';
import InfiniteScroll from '../../components/InfiniteScroll';
import { INPUT_CHANGED, LOAD_MORE } from '../../../redux';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006aa6',
    },
    secondary: {
      main: '#006aa6',
    },
  },
});

const App = ({ dispatch }) => {
  const debounceInput = useCallback(
    debounce(
      (keywords, nextPage) => dispatch({ type: INPUT_CHANGED, keywords, nextPage }),
      1000
    )
  , []);
  const {
    keywords = '',
    repos = [],
    nextPage = 1,
    lastPage = 1,
    isSearching = false,
    error = null,
  } = useSelector(state => state.inputReducer);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar inputChange={debounceInput} />
      {isSearching &&  <LinearProgress />}
      <InfiniteScroll
        loadMore={() => dispatch({ type: LOAD_MORE, keywords, nextPage })}
        isSearching={isSearching}
        end={(nextPage > lastPage)}
        error={error}
        spinner={<CircularProgress />}
      >
        {repos.map(repo => (
          <ListItem
            button
            key={repo.id}
            onClick={() => {
              window.open(repo.html_url, '_blank', 'noreferrer=yes');
            }
          }>
            <ListItemIcon>
              <Avatar alt={repo.name} src={repo.owner.avatar_url} />
            </ListItemIcon>
            <ListItemText primary={repo.full_name} secondary={repo.description} />
          </ListItem>
        ))}
      </InfiniteScroll>
    </ThemeProvider>
  );
}

export default connect()(App)
