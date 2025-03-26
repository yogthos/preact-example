import { atom, useAtom } from 'jotai';

const userAtom = atom('');

export function Greeting() {
  const [user, setUser] = useAtom(userAtom);
  return (
    <div class="greeting">
      <h1>Hello, {user.name || 'World'}!</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={user.name}
        onInput={(e) => setUser({name: e.target.value})}
      />
    </div>
  );
}

export function getUser() {
  const [user] = useAtom(userAtom);
  return user;
}