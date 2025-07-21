import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import SlotMachineGame from './pages/SlotMachineGame';
import CoinFlipGame from './pages/CoinFlipGame';
import DiceRollGame from './pages/DiceRollGame';
import { getMyInfo } from './api';
import type { UserData } from './api';
import './App.css';

function App() {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = await getMyInfo();
                setUser(userData);
            } catch (error: unknown) {
                console.error("Failed to fetch user", error);
                if (error && typeof error === 'object' && 'response' in error) {
                    const errorObj = error as { response?: { status?: number } };
                    if (errorObj.response && errorObj.response.status === 409) {
                        console.error("Conflict error when fetching user");
                    }
                }
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App min-h-screen bg-tech-gradient flex items-center justify-center p-4 relative overflow-hidden">
            {/* 科技背景效果 */}
            <div className="absolute inset-0 bg-cyber-grid opacity-20" style={{backgroundSize: '50px 50px'}}></div>
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"></div>
            
            {/* 浮动粒子效果 */}
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full animate-pulse" style={{backgroundColor: '#00D4FF'}}></div>
            <div className="absolute top-20 right-20 w-1 h-1 rounded-full animate-ping" style={{backgroundColor: '#8B5CF6'}}></div>
            <div className="absolute bottom-20 left-20 w-1.5 h-1.5 rounded-full animate-pulse" style={{backgroundColor: '#06B6D4'}}></div>
            <div className="absolute bottom-10 right-10 w-1 h-1 rounded-full animate-ping" style={{backgroundColor: '#F472B6'}}></div>
            <div className="w-80 h-[700px] bg-tech-card/90 backdrop-blur-md rounded-3xl shadow-tech-glow border border-neon-blue/50 overflow-hidden flex flex-col relative" style={{backgroundColor: 'rgba(26, 26, 46, 0.9)'}}>
                {/* 内部发光效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 rounded-3xl"></div>
                <div className="relative z-10 flex flex-col h-full">
                {user && (
                    <nav className="backdrop-blur-md border-b border-neon-blue/30 p-4 flex justify-between items-center" style={{background: 'linear-gradient(to right, rgba(15, 15, 35, 0.95), rgba(22, 33, 62, 0.9))'}}>
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-sm font-bold text-white shadow-neon-blue">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-modern font-semibold text-base tracking-tight" style={{color: '#06B6D4'}}>
                                    {user.username}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-neon-cyan" style={{background: 'linear-gradient(to right, #00D4FF, #06B6D4)'}}>
                                💰 {user.coinBalance.toLocaleString()}
                            </div>
                            <button onClick={handleLogout} className="text-neon-purple/70 hover:text-neon-purple text-sm font-medium transition-colors">
                                Exit
                            </button>
                        </div>
                    </nav>
                )}
                <div className="flex-1">
            <Routes>
                <Route
                    path="/auth"
                    element={!user ? <AuthPage onLoginSuccess={fetchUser} /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/slot-machine"
                    element={user ? <SlotMachineGame onLogout={handleLogout} /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/coin-flip"
                    element={user ? <CoinFlipGame /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/dice-roll"
                    element={user ? <DiceRollGame /> : <Navigate to="/auth" />}
                />
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
            </Routes>
                </div>
                </div>
            </div>
        </div>
    );
}

export default App;
