"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../database/config"));
const contacts_1 = __importDefault(require("../router/contacts"));
class Server {
    constructor() {
        this.db = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.default)();
        });
        this.routes = () => {
            this.app.use(this.path.contacts, contacts_1.default);
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 1337;
        this.path = {
            contacts: '/contacts'
        };
        //Database
        this.db();
        //middlewares
        this.middlewares();
        //routes
        this.routes();
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server port: ${this.port}`);
        });
    }
    publicFolder() {
        const publicPath = path_1.default.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.publicFolder();
    }
}
exports.default = Server;
