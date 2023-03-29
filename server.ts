import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import { Kart } from "./src/Models/Karts";

const app = express();

const server = http.createServer(app);

let users: any[] = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

mongoose
  .connect(
    "mongodb+srv://alandeau:6juKSqZmKItf6Ydn@karts-manager.argphxc.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to mongo db");
  })
  .catch((e) => {
    console.log(e);
  });

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("newUserUpdate", users);
    socket.disconnect();
  });

  socket.on("newUser", (data) => {
    const newUser = {
      socketId: socket.id,
      username: data,
    };
    users.push(newUser);
    io.emit("newUserUpdate", users);
  });

  socket.on("getKarts", async () => {
    try {
      const karts = await Kart.find()
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("addKart", async (data) => {
    
    try {
      const newKart = new Kart({id: data.id, status: data.status})
      newKart.save()
    } catch (error) {
      console.log(error)
    }
  })
});

server.listen(4000, () => {
  console.log("Listening on port 3000");
});
