import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

import { Kart } from "./Models/Karts";

const app = express();
const dbURL = process.env.MONGODB_URL

const server = http.createServer(app);

let users: any[] = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

if (dbURL) {
  mongoose
  .connect(
    dbURL
  )
  .then(() => {
    console.log("Connected to mongo db");
  })
  .catch((e) => {
    console.log(e);
  });
}


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
      const karts = await Kart.find();
      io.emit("getKartsUpdate", karts);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("addKart", async (data) => {
    try {
      const newKart = new Kart({
        number: data.number,
        status: data.status,
        size: data.size,
      });
      await newKart.save();
      io.emit("UpdateKarts");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("updateKart", async (data) => {
    console.log(data);
    try {
      const updatedKart = await Kart.findByIdAndUpdate(data._id, {
        status: data.status,
        updatedBy: data.updatedBy,
        duration: data.duration,
        startTime: data.startTime,
        endTime: data.endTime,
        client: data.client
      })
      console.log(updatedKart)
      io.emit("UpdateKarts");

    } catch (error) {
      console.log(error)
    }
  });
});


server.listen(4000, () => {
  console.log("Listening on port 3000");
});
