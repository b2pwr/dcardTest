import React from 'react';
import { withStyles } from '@material-ui/core/styles';

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
      nextPage,
      lastPage,
      children,
    } = this.props;
    entries.forEach(entry => {
      if(entry.isIntersecting && children.props.children.length > 0) {
        if (!isSearching && nextPage <= lastPage){
          loadMore(nextPage);
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
        <div>
          {children}
        </div>
        <div className={classes.spinner}>
          {isBottom && children.props.children.length > 0 && spinner }
        </div>
        <div ref={this.observeRef} className="observe"></div>
      </div>
    );
  }
}

export default withStyles(styles)(InfiniteScroll);
