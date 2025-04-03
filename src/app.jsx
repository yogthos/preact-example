import { render } from 'preact';
import ShoppingCart from './components/ShoppingCart';

export function App() {
  return (
    <div class="app">
      <ShoppingCart />
    </div>
  );
}

render(<App />, document.getElementById('app'));