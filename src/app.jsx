import { render } from 'preact';
import { Router, Link, route } from 'preact-router';
import Counter from './components/Counter';
import {Greeting, getUser } from './components/Greeting';

// Page components
const Home = () => (
  <div class="page">
    <h1>Home Page</h1>
    <p>Welcome to our website!</p>
    <Greeting />
    <Link activeClassName="active" href="/about">
      About
    </Link>
  </div>
);

const About = () => (
  <div class="page">
    <h1>About Us</h1>
    <Counter />
    <p>Learn more about our company.</p>
  </div>
);

const Profile = () => {
  const user = getUser();
  return (
    <div class="page">
      <h2>Profile: {user.name}</h2>
      <p>This is some text about {user.name}.</p>
      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
};

const NotFound = () => (
  <div class="page">
    <h1>404 - Page Not Found</h1>
    <p>The requested page doesn't exist.</p>
  </div>
);

function WithUser({user, children }) {
  console.log('>>>', user);
  if (!getUser()) {
    route('/');
  }
  return <>{children}</>;
}

export function App() {
  return (
    <div class="app">
      <nav>
        <Link activeClassName="active" href="/">Home</Link>
        <Link activeClassName="active" href="/about">About</Link>
        <Link activeClassName="active" href="/profile/123">Profile 123</Link>
      </nav>

      <Router>
        <Home path="/" />
        <About path="/about" />
        <WithUser path="/profile/:user?"> <Profile/> </WithUser>
        <NotFound type="404" default />
      </Router>

      <style jsx>{`
        nav {
          padding: 1rem;
          background: #f0f0f0;
          margin-bottom: 2rem;
        }

        nav a {
          margin-right: 1rem;
          text-decoration: none;
          color: #333;
          padding: 0.5rem 1rem;
          border-radius: 4px;
        }

        nav a.active {
          background: #0070f3;
          color: white;
        }

        .page {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        .app {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          text-align: center;
        }

        input {
          padding: 0.5rem;
          margin: 1rem 0;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

render(<App />, document.getElementById('app'));