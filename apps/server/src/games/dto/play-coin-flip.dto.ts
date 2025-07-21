import { IsNumber, Min, IsString, IsIn } from 'class-validator';

export class PlayCoinFlipDto {
  @IsNumber()
  @Min(1)
  betAmount: number;

  @IsString()
  @IsIn(['heads', 'tails']) // 限制只能是 'heads' 或 'tails'
  choice: 'heads' | 'tails';
}
