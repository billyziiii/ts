import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GamesService {
  private prisma = new PrismaClient();

  async playSlotMachine(userId: string, betAmount: number) {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.coinBalance < betAmount) {
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
      }

      // Simulate slot machine logic (simplified)
      // For simplicity, let's say there's a 50% chance to win double the bet,
      // and 50% chance to lose the bet.
      const win = Math.random() < 0.5;
      let winnings = 0;

      if (win) {
        winnings = betAmount * 2; // Win double the bet
      } else {
        winnings = -betAmount; // Lose the bet
      }

      const newBalance = Math.floor(user.coinBalance + winnings); // 确保newBalance是整数

      await prisma.user.update({
        where: { id: userId },
        data: { coinBalance: newBalance },
      });

      return {
        result: win ? 'win' : 'lose',
        winnings: winnings,
        newBalance: newBalance,
      };
    });
  }

  async playCoinFlip(userId: string, betAmount: number, choice: 'heads' | 'tails') {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.coinBalance < betAmount) {
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
      }

      // Simulate coin flip
      const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';
      let winnings = 0;

      if (coinResult === choice) {
        winnings = betAmount * 2; // Win double the bet
      } else {
        winnings = -betAmount; // Lose the bet
      }

      const newBalance = Math.floor(user.coinBalance + winnings); // 确保newBalance是整数

      // 确保这一段代码在 playCoinFlip 的事务块内部
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          coinBalance: newBalance,
        },
      });

      return {
        coinResult,
        choice,
        result: coinResult === choice ? 'win' : 'lose',
        winnings: winnings,
        newBalance: newBalance,
      };
    });
  }

  async playDiceRoll(userId: string, betAmount: number, guess: number) {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user.coinBalance < betAmount) {
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
      }

      // Simulate dice roll (1-6)
      const diceResult = Math.floor(Math.random() * 6) + 1;
      let winnings = 0;

      if (diceResult === guess) {
        winnings = betAmount * 5; // Win 5 times the bet if guess is correct
      } else {
        winnings = -betAmount; // Lose the bet
      }

      const newBalance = Math.floor(user.coinBalance + winnings);

      // 确保这一段代码在 playDiceRoll 的事务块内部
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          coinBalance: newBalance,
        },
      });

      return {
        diceResult,
        guess,
        result: diceResult === guess ? 'win' : 'lose',
        winnings: winnings,
        newBalance: newBalance,
      };
    });
  }
}
