import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex flex-col h-full font-casino">
            {/* 手机风格容器 */}
            <div className="flex-1 flex flex-col">
                {/* 标题区域 */}
                <div className="text-center p-6 border-b border-neon-blue/30" style={{background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.1), transparent)'}}>
                    <div className="text-6xl mb-4 animate-pulse">🎰</div>
                    <h1 className="text-2xl font-bold font-modern mb-2 tracking-tight" style={{color: '#06B6D4'}}>
                        Lucky Coin Casino
                    </h1>
                    <p className="text-sm font-medium" style={{color: 'rgba(0, 212, 255, 0.8)'}}>
                        Choose Your Game
                    </p>
                </div>

                {/* 游戏选择列表 */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    <Link to="/slot-machine" className="block group relative rounded-2xl p-5 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm border hover:shadow-lg" style={{background: 'linear-gradient(to right, rgba(15, 15, 35, 0.6), rgba(22, 33, 62, 0.4))', borderColor: 'rgba(0, 212, 255, 0.3)'}}>
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl animate-pulse">🎰</div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold font-modern tracking-tight" style={{color: '#06B6D4'}}>Slot Machine</h3>
                                <p className="text-sm font-medium" style={{color: 'rgba(0, 212, 255, 0.7)'}}>Spin the reels of fortune</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <div className="px-2 py-1 rounded-md text-xs font-medium" style={{backgroundColor: 'rgba(0, 212, 255, 0.2)', color: '#06B6D4'}}>Win Rate: 50%</div>
                                    <div className="px-2 py-1 rounded-md text-xs font-medium" style={{backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981'}}>2x Payout</div>
                                </div>
                            </div>
                            <div className="transition-colors text-xl group-hover:opacity-100 opacity-40" style={{color: '#8B5CF6'}}>→</div>
                        </div>
                    </Link>

                    <Link to="/coin-flip" className="block group relative rounded-2xl p-5 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm border hover:shadow-lg" style={{background: 'linear-gradient(to right, rgba(15, 15, 35, 0.6), rgba(22, 33, 62, 0.4))', borderColor: 'rgba(139, 92, 246, 0.3)'}}>
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl animate-bounce">🪙</div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold font-modern tracking-tight" style={{color: '#8B5CF6'}}>Coin Flip</h3>
                                <p className="text-sm font-medium" style={{color: 'rgba(139, 92, 246, 0.7)'}}>Classic heads or tails</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <div className="px-2 py-1 rounded-md text-xs font-medium" style={{backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#8B5CF6'}}>Win Rate: 50%</div>
                                    <div className="px-2 py-1 rounded-md text-xs font-medium" style={{backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981'}}>2x Payout</div>
                                </div>
                            </div>
                            <div className="transition-colors text-xl group-hover:opacity-100 opacity-40" style={{color: '#06B6D4'}}>→</div>
                        </div>
                    </Link>

                    <Link to="/dice-roll" className="block group relative rounded-2xl p-5 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm border hover:shadow-lg" style={{background: 'linear-gradient(to right, rgba(15, 15, 35, 0.6), rgba(22, 33, 62, 0.4))', borderColor: 'rgba(6, 182, 212, 0.3)'}}>
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl animate-spin" style={{animationDuration: '3s'}}>🎲</div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold font-modern tracking-tight" style={{color: '#06B6D4'}}>Dice Roll</h3>
                                <p className="text-sm font-medium" style={{color: 'rgba(6, 182, 212, 0.7)'}}>Predict the lucky number</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <div className="px-2 py-1 rounded-md text-xs font-medium" style={{backgroundColor: 'rgba(6, 182, 212, 0.2)', color: '#06B6D4'}}>Win Rate: 16.7%</div>
                                    <div className="px-2 py-1 rounded-md text-xs font-medium" style={{backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B'}}>5x Payout</div>
                                </div>
                            </div>
                            <div className="transition-colors text-xl group-hover:opacity-100 opacity-40" style={{color: '#00D4FF'}}>→</div>
                        </div>
                    </Link>
                </div>

                {/* 底部装饰 */}
                <div className="p-3 text-center border-t" style={{borderColor: 'rgba(0, 212, 255, 0.2)'}}>
                    <div className="flex justify-center space-x-3 text-sm animate-pulse">
                        <span style={{color: '#00D4FF'}}>♠</span>
                        <span style={{color: '#8B5CF6'}}>♥</span>
                        <span style={{color: '#06B6D4'}}>♦</span>
                        <span style={{color: '#F472B6'}}>♣</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
