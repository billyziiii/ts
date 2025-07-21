"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let GamesService = class GamesService {
    prisma = new client_1.PrismaClient();
    async playSlotMachine(userId, betAmount) {
        return this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (user.coinBalance < betAmount) {
                throw new common_1.HttpException('Insufficient balance', common_1.HttpStatus.BAD_REQUEST);
            }
            const win = Math.random() < 0.5;
            let winnings = 0;
            if (win) {
                winnings = betAmount * 2;
            }
            else {
                winnings = -betAmount;
            }
            const newBalance = Math.floor(user.coinBalance + winnings);
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
    async playCoinFlip(userId, betAmount, choice) {
        return this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (user.coinBalance < betAmount) {
                throw new common_1.HttpException('Insufficient balance', common_1.HttpStatus.BAD_REQUEST);
            }
            const coinResult = Math.random() < 0.5 ? 'heads' : 'tails';
            let winnings = 0;
            if (coinResult === choice) {
                winnings = betAmount * 2;
            }
            else {
                winnings = -betAmount;
            }
            const newBalance = Math.floor(user.coinBalance + winnings);
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
    async playDiceRoll(userId, betAmount, guess) {
        return this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            if (user.coinBalance < betAmount) {
                throw new common_1.HttpException('Insufficient balance', common_1.HttpStatus.BAD_REQUEST);
            }
            const diceResult = Math.floor(Math.random() * 6) + 1;
            let winnings = 0;
            if (diceResult === guess) {
                winnings = betAmount * 5;
            }
            else {
                winnings = -betAmount;
            }
            const newBalance = Math.floor(user.coinBalance + winnings);
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
};
exports.GamesService = GamesService;
exports.GamesService = GamesService = __decorate([
    (0, common_1.Injectable)()
], GamesService);
//# sourceMappingURL=games.service.js.map