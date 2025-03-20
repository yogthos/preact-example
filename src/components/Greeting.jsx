import { useAtom } from 'jotai';
import { nameAtom } from '../atoms';

export default function Greeting() {
  const [name] = useAtom(nameAtom);
  return (
    <div class="greeting">
      <h1>Hello, {name || 'World'}!</h1>
    </div>
  );
}