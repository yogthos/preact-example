import { render } from 'preact';
import { Router, Link } from 'preact-router';
import About from './components/About';
import Home from './components/Home';
import User from './components/User';
import { Login, WithUser } from './components/Login';
import Logout from './components/Logout';
import { userAtom } from './atoms';
import { useAtom } from 'jotai';

const NotFound = () => (
  <div class="page">
    <h1>404 - Page Not Found</h1>
    <p>The requested page doesn't exist.</p>
  </div>
);

export function App() {
  const [user] = useAtom(userAtom);
  return (
    <div class="app">
      <nav>
        <Link activeClassName="active" href="/">Home</Link>        
        <Link activeClassName="active" href="/page/123">Page 123</Link>
        <Link activeClassName="active" href="/about">About</Link>
        {user.isLoggedIn && <Link activeClassName="active" href="/logout">Logout</Link>}
      </nav>

      <Router>        
        <Home path="/" />
        <About path="/about" />
        <Login path="/login" />
        <Logout path="/logout" />
        <WithUser path="/page/:id?"> <User /> </WithUser>
        <NotFound type="404" default />
      </Router>
    </div>
  );
}

render(<App />, document.getElementById('app'));