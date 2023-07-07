import express, { Application, NextFunction } from "express";
import http from "http";
import connectDb from "./frameworks/database/Postgres/Connection/connection";
import serverConfig from "./frameworks/webserver/server";
import expressConfig from "./frameworks/webserver/express";
import routes from "./frameworks/webserver/routes";
import Colors = require("colors.ts");
import errorHandlingMidlleware from "./frameworks/webserver/middlewares/errorHandlingMiddleware";
import AppError from "./utils/appError";
import path from "path";
import { Server } from "socket.io";
import socketConfig from "./frameworks/Websocket/Socket";
Colors.enable;

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin:['https://interviewxperts.online', 'https://www.interviewxperts.online'],
    origin:['http://localhost:5173'],
    methods: ["GET", "POST"],
  },
});
//psql connection
socketConfig(io);

connectDb();
expressConfig(app);

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// routes for each endpoint
routes(app);

app.use(errorHandlingMidlleware);

//  catch 404 and forward to error handler
app.all("*", (req, res, next: NextFunction) => {
  next(new AppError("Not found", 404));
});

serverConfig(server).startServer();
