import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db/connectDB.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRouter.js";
import conversationRouter from "./routes/conversationRouter.js";
import messageRouter from "./routes/messageRouter.js";

import path from "path";
import SocketServer from "./socketServer.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
/* const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("a user connected.");
  SocketServer(socket);
}); */
const __dirname = path.resolve();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
