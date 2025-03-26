import { atom, useAtom } from 'jotai';

const countAtom = atom(0);

export default function Counter() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div class="counter">
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}