import { useState } from 'react';
import { playDiceRoll } from '../api';
import type { GameResult } from '../api'; // 导入 GameResult 类型
import { Link } from 'react-router-dom';

// 删除以下本地的 GameResult 接口定义，以避免冲突
// interface GameResult {
//   outcome: number; // 或者根据实际返回类型调整
//   win: boolean;
//   winnings: number;
//   newBalance: number;
// }

const DiceRollGame = () => {
    const [bet, setBet] = useState(10);
    const [target, setTarget] = useState(3);
    const [result, setResult] = useState<GameResult | null>(null); // 使用导入的 GameResult
    const [error, setError] = useState('');

    const handlePlay = async () => {
        setError('');
        setResult(null);
        try {
            const apiResult = await playDiceRoll(bet, target); // 更改变量名以避免冲突
            setResult(apiResult); // 设置结果
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div className="flex flex-col h-full font-casino">
            {/* 手机风格容器 - 与Dashboard一致 */}
            <div className="flex-1 flex flex-col">
                {/* 标题区域 */}
                <div className="text-center p-6 border-b" style={{background: 'linear-gradient(to bottom, rgba(6, 182, 212, 0.1), transparent)', borderColor: 'rgba(6, 182, 212, 0.3)'}}>
                    <div className="text-6xl mb-4 animate-spin" style={{animationDuration: '3s'}}>🎲</div>
                    <h1 className="text-2xl font-bold font-modern mb-2 tracking-tight" style={{color: '#06B6D4'}}>
                        Dice Roll
                    </h1>
                    <p className="text-sm font-medium" style={{color: 'rgba(6, 182, 212, 0.8)'}}>Predict the number!</p>
                </div>

                {/* 游戏区域 */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* 骰子显示区域 */}
                    <div className="border-2 rounded-2xl p-6 mb-6 text-center" style={{backgroundColor: 'rgba(15, 15, 35, 0.5)', borderColor: 'rgba(6, 182, 212, 0.5)'}}>
                        <div className="text-6xl mb-2">🎲</div>
                        <p className="text-sm" style={{color: '#06B6D4'}}>Guess the number (1-6)</p>
                    </div>

                    {/* 游戏控制 */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-lg font-bold mb-2" style={{color: '#8B5CF6'}}>
                                Bet Amount
                            </label>
                            <input
                                type="number"
                                value={bet}
                                onChange={(e) => setBet(parseInt(e.target.value) || 0)}
                                className="w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
                                style={{
                                    backgroundColor: 'rgba(15, 15, 35, 0.5)',
                                    color: '#06B6D4',
                                    borderColor: 'rgba(6, 182, 212, 0.5)'
                                }}
                                placeholder="Enter bet amount"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-bold mb-2" style={{color: '#8B5CF6'}}>
                                Your Target (1-6)
                            </label>
                            <select
                                value={target}
                                onChange={(e) => setTarget(parseInt(e.target.value))}
                                className="w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
                                style={{
                                    backgroundColor: 'rgba(15, 15, 35, 0.5)',
                                    color: '#06B6D4',
                                    borderColor: 'rgba(6, 182, 212, 0.5)'
                                }}
                            >
                                <option value={1}>🎲 1</option>
                                <option value={2}>🎲 2</option>
                                <option value={3}>🎲 3</option>
                                <option value={4}>🎲 4</option>
                                <option value={5}>🎲 5</option>
                                <option value={6}>🎲 6</option>
                            </select>
                        </div>

                        <button 
                            onClick={handlePlay} 
                            className="w-full text-xl py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02]"
                            style={{background: 'linear-gradient(to right, #06B6D4, #00D4FF)', color: 'white'}}
                        >
                            🎯 Roll Dice!
                        </button>
                    </div>

                    {/* 游戏结果 */}
                    {result && (
                        <div className="mt-6 p-4 border rounded-2xl text-center" style={{backgroundColor: 'rgba(15, 15, 35, 0.3)', borderColor: 'rgba(6, 182, 212, 0.5)'}}>
                            <h3 className="text-lg font-bold mb-2" style={{color: result.result === 'win' ? '#10B981' : '#F59E0B'}}>
                                {result.result === 'win' ? '🎉 YOU WON!' : '😞 You Lost'}
                            </h3>
                            <div className="space-y-1 text-sm">
                                <p style={{color: '#06B6D4'}}>Winnings: {result.winnings}</p>
                                <p style={{color: '#06B6D4'}}>New Balance: {result.newBalance}</p>
                            </div>
                        </div>
                    )}

                    {/* 错误信息 */}
                    {error && (
                        <div className="mt-4 p-4 rounded-lg border" style={{backgroundColor: 'rgba(220, 20, 60, 0.2)', borderColor: '#DC143C'}}>
                            <p className="text-center text-sm" style={{color: '#DC143C'}}>{error}</p>
                        </div>
                    )}
                </div>

                {/* 返回按钮 */}
                <div className="p-4 border-t" style={{borderColor: 'rgba(6, 182, 212, 0.2)'}}>
                    <Link to="/dashboard" className="block text-center text-sm font-medium transition-colors hover:opacity-80" style={{color: '#06B6D4'}}>
                        ← Back to Games
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DiceRollGame;