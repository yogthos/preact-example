import { cloneElement, toChildArray } from 'preact';
import { useState } from 'preact/hooks';
import { route } from 'preact-router';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms';

export function WithUser({ children, ...props }) {
    const [user] = useAtom(userAtom); 
    if (!user.isLoggedIn) {
        route('/login');
        return null; // Important to prevent rendering children
    }

    return (
        <>
            {toChildArray(children).map((child, index) => {
                // Only clone valid Preact elements
                if (typeof child?.type === 'function' || typeof child?.type === 'string') {
                    return cloneElement(child, { 
                        ...props,
                        key: child.key || index 
                    });
                }
                // Return non-component children as-is
                return child;
            })}
        </>
    );
}

export function Login() {
    const [_user, setUser] = useAtom(userAtom);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let email = formData.get("email");
        let password = formData.get("password");
        setIsLoading(true);
        setError('');
        try {
            // Basic validation
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                throw new Error('Please enter a valid email address');
            }
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Here you would typically make an actual API call
            setUser({ email, isLoggedIn: true });

            // Redirect on success
            route('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div class="login-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        disabled={isLoading}
                        required
                    />
                </div>

                <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        disabled={isLoading}
                        required
                    />
                </div>

                {error && <div class="error-message">{error}</div>}

                <button disabled={isLoading} class="login-button" >
                    {isLoading ? 'Logging in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}
