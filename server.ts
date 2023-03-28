import express from 'express'
import http from 'http';
import { Server } from 'socket.io';


const app = express();

const server = http.createServer(app);

let users:any[] = []



const io = new Server(server, {cors:{
  origin: "http://localhost:5174"
}});

let karts = [
  {
    id: 1,
    status: 'libre',
  },
  {
    id: 2,
    status: 'libre',
  },
  {
    id: 3,
    status: 'HS',
  },
]

io.on('connection', (socket) => {


  socket.on('disconnect', () => {
    users = users.filter((user) => user.socketId !== socket.id) 
    io.emit('newUserUpdate', users)
    socket.disconnect()
  });

  socket.on('newUser', (data) => {
    
    const newUser = {
      socketId: socket.id,
      username: data
    }
    users.push(newUser)
    io.emit('newUserUpdate', users)
  })

  socket.emit('getKarts', karts)


});


server.listen(4000, () => {
  console.log('Listening on port 3000')
})