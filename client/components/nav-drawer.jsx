import React from 'react';
import AppContext from '../lib/app-context';

class Navigation extends React.Component {
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
    const { handleSignOut } = this.context;
    const isClicked = this.state.isClicked ? 'show-nav' : 'hide-nav';
    const modalBackground = this.state.isClicked ? 'nav-background' : 'no-nav-background';
    const backdrop = this.state.isClicked ? this.handleClick : null;
    const drawerBackground = this.state.isClicked ? 'backdrop' : '';
    const homePage = this.context.route.path === '' && 'blue';
    const eventPage = this.context.route.path === 'Events' && 'blue';
    const postPage = this.context.route.path === 'Post' && 'blue';
    const chatPage = this.context.route.path === 'Chat' && 'blue';
    return (
      <>
      {this.context.user && (
      <nav className={modalBackground}>
        <div onClick={ backdrop } className={drawerBackground}></div>
          <div className={`nav-slider ${isClicked}`}>
            <h1>Social Lite</h1>
            <ul>
              <a href="#"><li onClick={this.handleClick}><h3 className={homePage}>Home</h3></li></a>
              <a href="#Events"><li onClick={this.handleClick}><h3 className={eventPage}>Events</h3></li></a>
              <a href="#Post"><li onClick={this.handleClick}><h3 className={postPage}>Create a Post</h3></li></a>
              <a href="#Chat"><li onClick={this.handleClick}><h3 className={chatPage}>Chat</h3></li></a>
              <a href="#login"><li onClick={handleSignOut}><h3>Log Out</h3></li></a>
              <h3 className="welcome-user">{`Welcome ${this.context.user.displayName}!`}</h3>
            </ul>
          </div>
        <div className="nav col-full">
          <div className="row">
            <div className="hamburger">
              <i onClick={this.handleClick} className="fas fa-bars"></i>
          </div>
            <div className="nav-header row">
                <h1 className="nav-title">{ this.context.route.path === '' ? 'Home' : this.context.route.path
                }</h1>
            </div>
              <div className="profile-picture row">
                  <img src={this.context.user.avatarUrl} alt=""/>
              </div>
            </div>
        </div>
      </nav>
      )}
      </>
    );
  }
}

Navigation.contextType = AppContext;

export default Navigation;
