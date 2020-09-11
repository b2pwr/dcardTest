import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import * as Selectors from './selectors';
import AppBar from '../../components/AppBar';
import InfiniteScroll from '../../components/InfiniteScroll';

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

class App extends React.Component {
  render() {
    const {
      inputChange,
      loadMore,
      isSearching,
      keywords,
      repos,
      nextPage,
    } = this.props;
    const debounceInput = debounce(inputChange, 2000);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar inputChange={debounceInput} />
        {isSearching &&  <LinearProgress />}
        <InfiniteScroll
          loadMore={() => {
            if(!isSearching) {
              loadMore(keywords, nextPage);
            }
          }}
          spinner={<CircularProgress />}
        >
          <List component="nav">
            {repos.map(repo => (
              <ListItem
                button
                key={repo.id}
                onClick={() => {
                  window.open(repo.html_url, '_blank', 'noopener,resizable,scrollbars');
                }
              }>
                <ListItemIcon>
                  <Avatar alt={repo.name} src={repo.owner.avatar_url} />
                </ListItemIcon>
                <ListItemText primary={repo.full_name} secondary={repo.description} />
              </ListItem>
            ))}
          </List>
        </InfiniteScroll>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  keywords: Selectors.selectKeywords,
  repos: Selectors.selectRepos,
  nextPage: Selectors.selectNextPage,
  isSearching: Selectors.selectIsSearching,
  error: Selectors.selectError,
});

const mapDispatchToProps = dispatch => {
  return {
    inputChange: (keywords, nextPage) => {
      dispatch({ type: 'INPUT_CHANGED', keywords, nextPage });
    },
    loadMore: (keywords, nextPage) => {
      dispatch({ type: 'LOAD_MORE', keywords, nextPage });
    },
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
