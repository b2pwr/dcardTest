import React from 'react';

class InfiniteScroll extends React.Component {
  constructor() {
    super();
    this.observeRef = React.createRef();
  }

  componentDidUpdate = () => {
    const node = this.observeRef.current;
    if(node) {
      var options = {
        root: null,
        rootMargin: "0px",
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
        {repos.map(repo => (
          <div style={{ height: 40 }} key={repo.id}>
            {repo.full_name}
          </div>
        ))}
        </div>
        {repos.length > 0 && <div ref={this.observeRef} className="observe"></div>}
      </div>
    );
  }
}

export default InfiniteScroll;
