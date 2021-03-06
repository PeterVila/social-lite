import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Post from './pages/post';
import Chat from './pages/chat';
import EventHome from './pages/eventpage';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';
import Navigation from './components/nav-drawer';
import FooterNav from './components/nav-footer';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    if (token) {
      window.localStorage.setItem('react-context-jwt', token);
      this.setState({
        user
      });
    }
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({
      user: null
    });
  }

  componentDidMount() {
    window.addEventListener('hashchange', e => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'login') {
      return <Login/>;
    }
    if (route.path === 'register') {
      return <Register />;
    }
    if (route.path === 'Post') {
      return <Post />;
    }
    if (route.path === 'Chat') {
      return <Chat/>;
    }
    if (route.path === 'Events') {
      return <EventHome />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
    <AppContext.Provider value={contextValue}>
    <Navigation path={this.state.route.path} />
    { this.renderPage() }
    <FooterNav />
    </AppContext.Provider>
    );
  }
}
