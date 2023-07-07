"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./frameworks/database/Postgres/Connection/connection"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const Colors = require("colors.ts");
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandlingMiddleware"));
const appError_1 = __importDefault(require("./utils/appError"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const Socket_1 = __importDefault(require("./frameworks/Websocket/Socket"));
Colors.enable;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['https://interviewxperts.online'],
        methods: ["GET", "POST"],
    },
});
//psql connection
(0, Socket_1.default)(io);
(0, connection_1.default)();
(0, express_2.default)(app);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../public/uploads")));
// routes for each endpoint
(0, routes_1.default)(app);
app.use(errorHandlingMiddleware_1.default);
//  catch 404 and forward to error handler
app.all("*", (req, res, next) => {
    next(new appError_1.default("Not found", 404));
});
(0, server_1.default)(server).startServer();
