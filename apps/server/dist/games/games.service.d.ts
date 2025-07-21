export declare class GamesService {
    private prisma;
    playSlotMachine(userId: string, betAmount: number): Promise<{
        result: string;
        winnings: number;
        newBalance: number;
    }>;
    playCoinFlip(userId: string, betAmount: number, choice: 'heads' | 'tails'): Promise<{
        coinResult: string;
        choice: "heads" | "tails";
        result: string;
        winnings: number;
        newBalance: number;
    }>;
    playDiceRoll(userId: string, betAmount: number, guess: number): Promise<{
        diceResult: number;
        guess: number;
        result: string;
        winnings: number;
        newBalance: number;
    }>;
}
