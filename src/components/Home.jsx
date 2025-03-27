import { userAtom } from '../atoms';
import { useAtom } from 'jotai';
import { Greeting } from './Greeting';
import { Counter } from './Counter';

export default function Home(_props) {
    const [user] = useAtom(userAtom);
    return (
      <div class="page">
        <h1>Home Page</h1>
        <p>Welcome to our website!</p>        
        <Greeting />
        <Counter />
      </div>
    );
  };