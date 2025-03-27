import { atomWithStorage } from 'jotai/utils';

const userLocalStorageKey = 'userInfo';
export const userAtom = atomWithStorage(userLocalStorageKey, {isLoggedIn: false});

function clearStorage(storageKey) {    
    localStorage.removeItem(storageKey);
}

export function ClearUserStorage() {
    clearStorage(userLocalStorageKey);
}