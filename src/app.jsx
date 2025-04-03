import { render } from 'preact';
import { Router, Link } from 'preact-router';
import Home from './components/Home';

const NotFound = () => (
  <div class="page">
    <h1>404 - Page Not Found</h1>
    <p>The requested page doesn't exist.</p>
  </div>
);

export function App() {  
  return (
    <div class="app">
      <nav>
        <Link activeClassName="active" href="/">Home</Link>        
      </nav>
      <Router>        
        <Home path="/" />        
        <NotFound type="404" default />
      </Router>
    </div>
  );
}

render(<App />, document.getElementById('app'));