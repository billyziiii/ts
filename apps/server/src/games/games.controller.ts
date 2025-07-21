import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { GamesService } from './games.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PlaySlotDto } from './dto/play-slot.dto';
import { PlayCoinFlipDto } from './dto/play-coin-flip.dto';
import { PlayDiceRollDto } from './dto/play-dice-roll.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('slot/play')
  async playSlot(@Request() req, @Body() playSlotDto: PlaySlotDto) {
    const userId = req.user.id;
    const result = await this.gamesService.playSlotMachine(userId, playSlotDto.betAmount);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('coin-flip/play')
  async playCoinFlip(@Request() req, @Body() playCoinFlipDto: PlayCoinFlipDto) {
    const userId = req.user.id;
    const result = await this.gamesService.playCoinFlip(userId, playCoinFlipDto.betAmount, playCoinFlipDto.choice);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('dice-roll/play')
  async playDiceRoll(@Request() req, @Body() playDiceRollDto: PlayDiceRollDto) {
    const userId = req.user.id;
    const result = await this.gamesService.playDiceRoll(userId, playDiceRollDto.betAmount, playDiceRollDto.guess);
    return result;
  }
}
