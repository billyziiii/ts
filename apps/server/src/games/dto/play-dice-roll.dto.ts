import { IsNumber, Min, Max } from 'class-validator';

export class PlayDiceRollDto {
  @IsNumber()
  @Min(1)
  betAmount: number;

  @IsNumber()
  @Min(1)
  @Max(6)
  guess: number; // 用戶猜測的骰子點數 (1-6)
}
