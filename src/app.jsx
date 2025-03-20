import { render } from 'preact';
import { useState } from 'preact/hooks';
import Counter from './components/Counter';
import Greeting from './components/Greeting';

export function App() {
  const [name, setName] = useState('');

  return (
    <div class="app">
      <Greeting name={name || undefined} />
      
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onInput={(e) => setName(e.target.value)}
      />
      
      <Counter />
      
      <style jsx>{`
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