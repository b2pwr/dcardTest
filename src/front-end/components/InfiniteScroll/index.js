import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const styles = theme => ({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    height: 60,
  },
});

class InfiniteScroll extends React.Component {
  constructor() {
    super();
    this.state = {
      isBottom: false,
    };
    this.observeRef = React.createRef();
  }

  componentDidMount = () => {
    const node = this.observeRef.current;
    var options = {
      root: null, // viewport
      rootMargin: '0px 0px 300px 0px',
      threshold: 1.0,
    };
    
    this.observer = new IntersectionObserver(
      this.callback,
      options
    );
    this.observer.observe(node);
  }

  callback = (entries, observer) => {
    const {
      loadMore,
      isSearching,
      end,
      children,
    } = this.props;
    entries.forEach(entry => {
      if(entry.isIntersecting && children.length > 0) {
        if (!isSearching && !end){
          loadMore();
        }
        this.setState({
          isBottom: true,
        })
      } else {
        this.setState({
          isBottom: false,
        })
      }
    })
  }

  render() {
    const {
      classes,
      children,
      spinner,
    } = this.props;
    const {
      isBottom,
    } = this.state;
    return (
      <div>
        <List component="nav">
          {children}
        </List>
        <div className={classes.spinner}>
          {isBottom && children.length > 0 && spinner }
        </div>
        <div ref={this.observeRef} className="observe"></div>
      </div>
    );
  }
}

export default withStyles(styles)(InfiniteScroll);
