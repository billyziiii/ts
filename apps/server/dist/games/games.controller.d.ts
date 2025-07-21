import { GamesService } from './games.service';
import { PlaySlotDto } from './dto/play-slot.dto';
import { PlayCoinFlipDto } from './dto/play-coin-flip.dto';
import { PlayDiceRollDto } from './dto/play-dice-roll.dto';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    playSlot(req: any, playSlotDto: PlaySlotDto): Promise<{
        result: string;
        winnings: number;
        newBalance: number;
    }>;
    playCoinFlip(req: any, playCoinFlipDto: PlayCoinFlipDto): Promise<{
        coinResult: string;
        choice: "heads" | "tails";
        result: string;
        winnings: number;
        newBalance: number;
    }>;
    playDiceRoll(req: any, playDiceRollDto: PlayDiceRollDto): Promise<{
        diceResult: number;
        guess: number;
        result: string;
        winnings: number;
        newBalance: number;
    }>;
}
