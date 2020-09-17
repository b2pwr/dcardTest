import React, { useState, useRef, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles({
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    height: 60,
  },
});

const InfiniteScroll = ({ children, spinner, loadMore, isSearching, end }) => {
  const classes = useStyles();
  const [isBottom, setIsBottom] = useState(false);
  const observeRef = useRef(null);

  const callback = useCallback(([entry]) => {
    if(entry.isIntersecting && children.length > 0) {
      if (!isSearching && !end) {
        loadMore();
      }
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  }, [children, isSearching, end, loadMore]);
  
  useEffect(() => {
    const options = {
      root: null, // viewport
      rootMargin: '0px 0px 300px 0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(
      callback,
      options
    );
    observer.observe(observeRef.current);
    return () => observer.disconnect();
  }, [observeRef, callback]);

  return (
    <div>
      <List component="nav">
        {children}
      </List>
      <div className={classes.spinner}>
        {isBottom && children.length > 0 && spinner }
      </div>
      <div ref={observeRef} className="observer"></div>
    </div>
  );
}

export default InfiniteScroll;
