import { useState } from 'react';
import type { FormEvent } from 'react';
import { register, login } from '../api';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (isLogin) {
                const res = await login(username, password);
                localStorage.setItem('token', res.data.access_token);
                onLoginSuccess();
            } else {
                await register(username, password);
                setSuccess('Registration successful! Please log in.');
                setIsLogin(true); // Switch to login form
            }
        } catch (err: unknown) {
            console.error('Auth error:', err);
            if (err && typeof err === 'object' && 'response' in err) {
                const errorObj = err as { 
                    response?: { 
                        status?: number; 
                        data?: { message?: string } 
                    };
                    request?: unknown;
                    message?: string;
                };
                
                if (errorObj.response) {
                    if (errorObj.response.status === 409) {
                        setError('Username already exists. Please choose another username or login.');
                    } else if (errorObj.response.data && errorObj.response.data.message) {
                        setError(errorObj.response.data.message);
                    } else {
                        setError(`Error (${errorObj.response.status}): An unexpected error occurred.`);
                    }
                } else if (errorObj.request) {
                    setError('No response from server. Please check your connection.');
                } else if (errorObj.message) {
                    setError('An error occurred: ' + errorObj.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    return (
        <div className="flex flex-col h-full font-casino justify-center p-4">
            <div className="flex-1 flex flex-col justify-center">
                    {/* 标题区域 */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4 animate-pulse">🎰</div>
                        <h1 className="text-2xl font-bold mb-2 font-modern tracking-tight" style={{color: '#06B6D4'}}>
                            Lucky Coin Casino
                        </h1>
                        <h2 className="text-base font-medium" style={{color: 'rgba(0, 212, 255, 0.8)'}}>
                            {isLogin ? 'Welcome back, player!' : 'Join the casino today'}
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{color: '#8B5CF6'}}>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-4 rounded-xl font-medium border focus:outline-none transition-all duration-300"
                                style={{
                                    backgroundColor: 'rgba(15, 15, 35, 0.6)',
                                    color: '#06B6D4',
                                    borderColor: 'rgba(0, 212, 255, 0.3)',
                                    backdropFilter: 'blur(10px)'
                                }}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{color: '#8B5CF6'}}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 rounded-xl font-medium border focus:outline-none transition-all duration-300"
                                style={{
                                    backgroundColor: 'rgba(15, 15, 35, 0.6)',
                                    color: '#06B6D4',
                                    borderColor: 'rgba(0, 212, 255, 0.3)',
                                    backdropFilter: 'blur(10px)'
                                }}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-4 mt-6 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-[1.02]" style={{background: 'linear-gradient(to right, #00D4FF, #06B6D4)', color: 'white'}}>
                            {isLogin ? '🎯 Enter Casino' : '🎰 Join Casino'}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-4 bg-casino-red/20 border border-casino-red rounded-lg">
                            <p className="text-casino-red text-center">{error}</p>
                        </div>
                    )}
                    {success && (
                        <div className="mt-4 p-4 bg-casino-green/20 border border-casino-green rounded-lg">
                            <p className="text-casino-green text-center">{success}</p>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-golden-200 text-sm">
                            {isLogin ? "New to the casino?" : 'Already a member?'}
                        </p>
                        <button 
                            onClick={() => setIsLogin(!isLogin)} 
                            className="text-golden-400 font-bold mt-2 hover:text-golden-300 transition-colors duration-300 underline decoration-golden-400/50 hover:decoration-golden-300 text-sm"
                        >
                            {isLogin ? 'Create Account' : 'Sign In'}
                        </button>
                    </div>

                    {/* 装饰元素 */}
                    <div className="mt-6 flex justify-center space-x-3 text-golden-400/30 text-lg">
                        <span>♠</span>
                        <span>♥</span>
                        <span>♦</span>
                        <span>♣</span>
                    </div>
            </div>
        </div>
    );
};

export default AuthPage;