import { atom, useAtom } from 'jotai';

const nameAtom = atom('World');

export default function Greeting() {
  const [name, setName] = useAtom(nameAtom);
  return (
    <div class="greeting">
      <h1>Hello, {name || 'World'}!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onInput={(e) => setName(e.target.value)}
      />
    </div>
  );
}