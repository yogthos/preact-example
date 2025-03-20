import { useState } from 'preact/hooks';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div class="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}