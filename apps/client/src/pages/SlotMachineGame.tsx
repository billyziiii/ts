import React, { useState, useEffect, useCallback } from 'react';
import type { GameResult, UserData } from '../api'; // 改为仅类型导入
import { getMyInfo, playSlotMachine } from '../api'; // 保留常规导入
import { Link } from 'react-router-dom';

interface SlotMachineGameProps {
  onLogout: () => void;
}

function SlotMachineGame({ onLogout }: SlotMachineGameProps) { // 修正 SlotMachineGameGameProps 为 SlotMachineGameProps
  const [userData, setUserData] = useState<UserData | null>(null);
  const [message, setMessage] = useState<string>('');
  const [betAmount, setBetAmount] = useState<number>(10);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [reels, setReels] = useState<string[]>(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const data = await getMyInfo();
        setUserData(data);
      } catch (error: any) {
        setMessage(`Error fetching user data: ${error.message || 'Unknown error'}`);
        onLogout();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [onLogout]); // 移除 token 依賴

  const handleSpin = useCallback(async () => {
    if (isSpinning || !userData || betAmount <= 0 || betAmount > userData.coinBalance) {
      setMessage('Invalid bet amount or insufficient balance');
      return;
    }

    setIsSpinning(true);
    setMessage('');
    setGameResult(null);

    let spinInterval: NodeJS.Timeout;

    // Animation
    spinInterval = setInterval(() => {
      const newReels = Array(3).fill(null).map(() => 
        symbols[Math.floor(Math.random() * symbols.length)]
      );
      setReels(newReels);
    }, 100);

    try {
      // Simulate spin duration
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(spinInterval);

      const result = await playSlotMachine(betAmount);
      setGameResult(result); // 直接设置 result，因为 api.ts 中的 GameResult 已包含所有属性
      setUserData((prev: UserData | null) => prev ? { ...prev, coinBalance: result.newBalance } : prev); // 为 prev 添加类型注解
      setMessage(`You ${result.result}! Winnings: ${result.winnings}`);
    } catch (error: any) {
      setMessage(`Error playing game: ${error.message || 'Unknown error'}`);
    } finally {
      clearInterval(spinInterval);
      setIsSpinning(false);
    }
  }, [isSpinning, betAmount, userData]); // 从依赖数组中移除 token

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && (!userData || value <= userData.coinBalance)) {
      setBetAmount(value);
    }
  };

  return (
    <div className="flex flex-col h-full font-casino">
      {/* 手机风格容器 - 与Dashboard一致 */}
      <div className="flex-1 flex flex-col">
        {/* 标题区域 */}
        <div className="text-center p-6 border-b" style={{background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.1), transparent)', borderColor: 'rgba(0, 212, 255, 0.3)'}}>
          <div className="text-6xl mb-4 animate-pulse">🎰</div>
          <h1 className="text-2xl font-bold font-modern mb-2 tracking-tight" style={{color: '#06B6D4'}}>
            Slot Machine
          </h1>
          {userData && (
            <div className="text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-lg" style={{background: 'linear-gradient(to right, #00D4FF, #06B6D4)'}}>
              💰 {userData.coinBalance.toLocaleString()}
            </div>
          )}
        </div>

        {/* 游戏区域 */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* 老虎机转轮 */}
          <div className="border-2 rounded-2xl p-6 mb-6" style={{backgroundColor: 'rgba(15, 15, 35, 0.5)', borderColor: 'rgba(0, 212, 255, 0.5)'}}>
            <div className="flex justify-around items-center text-4xl font-bold mb-4">
              {reels.map((reel, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 flex items-center justify-center rounded-xl border ${
                    isSpinning ? 'animate-spin-fast' : ''
                  }`}
                  style={{backgroundColor: 'rgba(0, 212, 255, 0.1)', borderColor: 'rgba(0, 212, 255, 0.3)'}}
                >
                  <span style={{color: '#06B6D4'}}>{reel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 下注区域 */}
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-bold mb-2" style={{color: '#8B5CF6'}}>
                Bet Amount
              </label>
              <input
                type="number"
                value={betAmount}
                onChange={handleBetChange}
                min="1"
                max={userData?.coinBalance || 999999}
                disabled={isSpinning || isLoading}
                className="w-full p-3 rounded-lg border-2 focus:outline-none transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(15, 15, 35, 0.5)',
                  color: '#06B6D4',
                  borderColor: 'rgba(0, 212, 255, 0.5)'
                }}
                placeholder="Enter bet amount"
              />
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning || isLoading || betAmount <= 0}
              className="w-full text-xl py-4 disabled:opacity-50 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02]"
              style={{background: 'linear-gradient(to right, #00D4FF, #06B6D4)', color: 'white'}}
            >
              {isSpinning ? '🎰 Spinning...' : '🎯 SPIN!'}
            </button>
          </div>

          {/* 游戏结果 */}
          {gameResult && (
            <div className="mt-6 p-4 border rounded-2xl text-center" style={{backgroundColor: 'rgba(15, 15, 35, 0.3)', borderColor: 'rgba(0, 212, 255, 0.5)'}}>
              <h3 className="text-lg font-bold mb-2" style={{color: gameResult.result === 'win' ? '#10B981' : '#8B5CF6'}}>
                {gameResult.result === 'win' ? '🎉 YOU WON!' : '😞 You Lost'}
              </h3>
              <div className="space-y-1 text-sm">
                <p style={{color: '#06B6D4'}}>Winnings: {gameResult.winnings}</p>
                <p style={{color: '#06B6D4'}}>New Balance: {gameResult.newBalance}</p>
              </div>
            </div>
          )}

          {/* 错误信息 */}
          {message && (
            <div className="mt-4 p-4 rounded-lg border" style={{backgroundColor: 'rgba(220, 20, 60, 0.2)', borderColor: '#DC143C'}}>
              <p className="text-center text-sm" style={{color: '#DC143C'}}>{message}</p>
            </div>
          )}
        </div>

        {/* 返回按钮 */}
        <div className="p-4 border-t" style={{borderColor: 'rgba(0, 212, 255, 0.2)'}}>
          <Link to="/dashboard" className="block text-center text-sm font-medium transition-colors hover:opacity-80" style={{color: '#06B6D4'}}>
            ← Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SlotMachineGame;