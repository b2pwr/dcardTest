import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
import * as Selectors from './selectors';
import Input from '../../components/Input';
import InfiniteScroll from '../../components/InfiniteScroll';

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
    // console.log(this.props);
    const debounceInput = debounce(inputChange, 1000);
    return (
      <div>
        <Input inputChange={debounceInput} />
        {isSearching && <div>searching...</div>}
        <InfiniteScroll
          repos={repos}
          loadMore={() => {
            if(!isSearching) {
              loadMore(keywords, nextPage);
            }
          }}
          nextPage={nextPage}
        />
      </div>
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
