import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (username: string, password: string) => {
  return api.post('/auth/register', { username, password });
};

// 確保 login 函數正確處理響應
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

// 定義返回類型接口
export interface UserData {
    username: string;
    coinBalance: number;
}

export interface GameResult {
    result: 'win' | 'lose';
    winnings: number;
    newBalance: number;
}

export const getMyInfo = async (): Promise<UserData> => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const playSlotMachine = async (betAmount: number): Promise<GameResult> => {
  const response = await api.post('/games/slot/play', { betAmount });
  return response.data;
};

export const playCoinFlip = async (betAmount: number, choice: string): Promise<GameResult> => { // 添加返回类型
  const response = await api.post('/games/coin-flip/play', { betAmount, choice });
  return response.data;
};

export const playDiceRoll = async (betAmount: number, guess: number): Promise<GameResult> => { // 添加返回类型
  const response = await api.post('/games/dice-roll/play', { betAmount, guess });
  return response.data;
};
