import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

class InfiniteScroll extends React.Component {
  constructor() {
    super();
    this.observeRef = React.createRef();
  }

  componentDidUpdate = () => {
    const node = this.observeRef.current;
    if(node) {
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
  }

  callback = (entries, observer) => {
    const {
      loadMore,
    } = this.props;
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        loadMore();
      }
    })
  }

  render() {
    const {
      repos,
    } = this.props;
    return (
      <div>
        <div>
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
        </div>
        {repos.length > 0 && <div ref={this.observeRef} className="observe"></div>}
      </div>
    );
  }
}

export default InfiniteScroll;
