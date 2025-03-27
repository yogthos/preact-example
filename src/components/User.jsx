import { userAtom } from '../atoms';
import { useAtom } from 'jotai';

export default function User(props) {
    const [user] = useAtom(userAtom);
    return (
        <div class="page">
            <h1>User Page</h1>
            <h3>Email: {user.email}</h3>
            <p>props:</p>
            <pre>{JSON.stringify({ props }, 0, '  ')}</pre>
        </div>
    );
};