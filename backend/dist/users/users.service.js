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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    userModel;
    walletModel;
    constructor(userModel, walletModel) {
        this.userModel = userModel;
        this.walletModel = walletModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findByWallet(address) {
        return this.walletModel.findOne({ address: address }).exec();
    }
    async createUserByEmail(username, email, password) {
        let existingUser = await this.userModel.findOne({ email });
        if (!existingUser) {
            existingUser = await this.userModel.findOne({ username });
        }
        if (existingUser) {
            throw new common_1.ConflictException('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userModel.create({ email, password: hashedPassword });
    }
    async createUserByWallet(address) {
        console.log(address);
        let existingUser = await this.userModel.findOne({ address });
        if (!existingUser) {
            existingUser = await this.userModel.findOne({ address });
        }
        return this.walletModel.create({ address });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.Wallet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map