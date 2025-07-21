"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const games_service_1 = require("./games.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const play_slot_dto_1 = require("./dto/play-slot.dto");
const play_coin_flip_dto_1 = require("./dto/play-coin-flip.dto");
const play_dice_roll_dto_1 = require("./dto/play-dice-roll.dto");
let GamesController = class GamesController {
    gamesService;
    constructor(gamesService) {
        this.gamesService = gamesService;
    }
    async playSlot(req, playSlotDto) {
        const userId = req.user.id;
        const result = await this.gamesService.playSlotMachine(userId, playSlotDto.betAmount);
        return result;
    }
    async playCoinFlip(req, playCoinFlipDto) {
        const userId = req.user.id;
        const result = await this.gamesService.playCoinFlip(userId, playCoinFlipDto.betAmount, playCoinFlipDto.choice);
        return result;
    }
    async playDiceRoll(req, playDiceRollDto) {
        const userId = req.user.id;
        const result = await this.gamesService.playDiceRoll(userId, playDiceRollDto.betAmount, playDiceRollDto.guess);
        return result;
    }
};
exports.GamesController = GamesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('slot/play'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, play_slot_dto_1.PlaySlotDto]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "playSlot", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('coin-flip/play'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, play_coin_flip_dto_1.PlayCoinFlipDto]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "playCoinFlip", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('dice-roll/play'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, play_dice_roll_dto_1.PlayDiceRollDto]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "playDiceRoll", null);
exports.GamesController = GamesController = __decorate([
    (0, common_1.Controller)('games'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
//# sourceMappingURL=games.controller.js.map