import React from 'react';

class Input extends React.Component {
  render() {
    const {
      inputChange,
    } = this.props;
    return (
      <React.Fragment>
        <input
          onChange={(e) => {
            inputChange(e.target.value, 1);
          }}
        />
      </React.Fragment>
    );
  }
}

export default Input;
