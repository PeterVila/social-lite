import React from 'react';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked
    }));
  }

  render() {
    return (
    <footer>
      <div className="row justify-center">
        <div className="icon text-center">
          <a href="#"><i className="fas fa-home"></i></a>
        </div>
        <div className="icon text-center">
          <a href="#profile">?</a>
        </div>
        <div className="post-icon text-center">
          <a href="#post"><i className="fas fa-camera"></i></a>
        </div>
        <div className="icon text-center">
          <a href="#chat">?</a>
        </div>
        <div className="icon text-center">
          <a href="#profile">?</a>
        </div>
      </div>
    </footer>
    );
  }
}

export default AppDrawer;
