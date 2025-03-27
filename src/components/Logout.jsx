import { useAtom } from 'jotai';
import { route } from 'preact-router';
import { ClearUserStorage, userAtom } from '../atoms.js';

export default function Logout () {
    const [_, setUser] = useAtom(userAtom);
    setUser({ isLoggedIn: false });
    ClearUserStorage();
    route('/login');
}