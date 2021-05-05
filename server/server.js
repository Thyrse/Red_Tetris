// import { NEW_MESSAGE, LOGIN } from "./socketActions";
const express = require("express");
const app = express();

const cors = require("cors");
const http = require("http").Server(app);
const { v1: uuidv1 } = require("uuid");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Game = require("./class/Game");
const Player = require("./class/Player");

app.use(cors());

const port = 4000;
const allUsers = [];
const allRooms = [];

function allAssignement(id, username) {
  const current = { id, username, inGame: false, room: "Lobby" };

  allUsers.push(current);
  return current;
}

function RandomTetrominos() {
  let newTetromino = [0, 1, 2, 3, 4, 5, 6];
  var tetrominosValues = newTetromino.length,
    temp,
    index;

  while (tetrominosValues > 0) {
    index = Math.floor(Math.random() * tetrominosValues);
    tetrominosValues--;
    temp = newTetromino[tetrominosValues];
    newTetromino[tetrominosValues] = newTetromino[index];
    newTetromino[index] = temp;
  }
  return newTetromino;
}

function allAssignementRooms(name, owner, type) {
  const current = {
    id: uuidv1(),
    name,
    owner,
    members: [],
    pieces: RandomTetrominos(),
    size: 5,
    type: type,
    hasStarted: false,
    mirror: [],
  };

  allRooms.push(current);
  return current;
}

function userLeave(id) {
  const index = allUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    return allUsers.splice(index, 1)[0];
  }
}

function startGame(roomID) {
  const index = allRooms.findIndex((room) => room.id === roomID);

  if (index !== -1) {
    allRooms[index].hasStarted = true;
  }
  return allRooms;
}

function userLeaveRoom(id) {
  allRooms.map((room) => {
    room.members.map((member) => {
      if (member.id === id) {
        const index = room.members.findIndex((user) => user.id === id);
        if (index !== -1) {
          room.members.splice(index, 1);
          if (room.owner === id && room.members.length >= 1) {
            room.owner = room.members[0].id;
          }
          if (room.hasStarted === true && room.members.length === 1) {
            io.to(room.id).emit("GAME_WINNER", room.id);
          }
        }
      }
    });
  });
  return allRooms;
}

function userJoinRoom(roomID, user) {
  const index = allRooms.findIndex((room) => room.id === roomID);

  const userToJoin = { id: user.socketID, username: user.username };
  if (allRooms[index].members.length === 0) {
    allRooms[index].owner = user.socketID;
  }
  if (index !== -1) {
    allRooms[index].members.push(userToJoin);
    return allRooms;
  }
}

function updateUsersList(roomID, user) {
  const index = allUsers.findIndex((usr) => usr.id === user.socketID);

  allUsers[index].room = roomID;

  return allUsers;
}

function addPiecesToRoom(roomID, pieces) {
  const index = allRooms.findIndex((room) => room.id === roomID);
  allRooms[index].pieces = allRooms[index].pieces.concat(pieces);
  return allRooms;
}

function updateMirrorRoom(user, mirror) {
  const index = allRooms.findIndex((room) => room.id === user.room);
  const indexUser = allRooms[index].mirror.findIndex(
    (shadow) => shadow.id === user.socketID
  );

  if (indexUser !== -1) {
    allRooms[index].mirror[indexUser].grid = mirror;
  } else {
    allRooms[index].mirror.push({
      id: user.socketID,
      grid: mirror,
      username: user.username,
    });
  }
  return allRooms;
}

const gameClass = new Game();
const playerClass = new Player();

io.on("connection", function (client) {
  // Listen to populate the store
  client.on("POPULATE", () => {
    io.emit("REFRESH_ROOMS", gameClass.rooms);
  });

  // Listen for user login
  client.on("LOGIN", (current_user) => {
    allAssignement(client.id, current_user);
    client.join("Lobby");
    playerClass.updatePlayers(allUsers);
    io.emit("REFRESH_USERSLIST", playerClass.players);
  });

  // Listen for new message in chat
  client.on("NEW_MESSAGE", (data) => {
    io.to(data.room).emit("REFRESH_MESSAGES", {
      username: data.username,
      message: data.message,
      room: data.room,
      user: data.userID,
    });
  });

  // Listen for creating a room
  client.on("CREATE_ROOM", (data) => {
    allAssignementRooms(data.name, data.owner, data.type);
    gameClass.updateRooms(allRooms);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
  });

  // Listen for starting a game
  client.on("START_GAME", (data) => {
    startGame(data.room);
    gameClass.updateRooms(allRooms);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
    io.to(data.room).emit("BEGIN_GAME");
  });

  // Listen for joining a room
  client.on("JOIN_ROOM", (data) => {
    client.leave("Lobby");
    client.join(data.datas.id);
    userJoinRoom(data.datas.id, data.currentUser);
    updateUsersList(data.datas.id, data.currentUser);
    gameClass.updateRooms(allRooms);
    playerClass.updatePlayers(allUsers);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
    io.emit("REFRESH_USERSLIST", playerClass.players);
  });

  // Listen for joining lobby
  client.on("JOIN_LOBBY", (data) => {
    const roomName = "Lobby";
    if (data && data.room && data.room !== "Lobby") {
      userLeaveRoom(client.id);
      updateUsersList(roomName, data);
      gameClass.updateRooms(allRooms);
      playerClass.updatePlayers(allUsers);
      io.emit("REFRESH_ROOMS", gameClass.rooms);
      io.emit("REFRESH_USERSLIST", playerClass.players);
      client.leave(data.room);
    }
    client.join("Lobby");
    client.emit("REFRESH_USER", roomName);
  });

  // Listen for sending a penalty
  client.on("SEND_PENALTY", (data) => {
    io.to(data.user.room).emit("RECEIVE_PENALTY", {
      user: data.user.socketID,
      penalty: data.penalty,
    });
  });

  // Listen for sending a mirror
  client.on("SEND_MIRROR", (data) => {
    updateMirrorRoom(data.user, data.mirror);
    gameClass.updateRooms(allRooms);
    io.to(data.room).emit("RECEIVE_MIRROR", allRooms);
    io.to(data.user.room).emit("RECEIVE_MIRROR", allRooms);
  });

  // Listen for receiving new pieces
  client.on("NEW_PIECES", (data) => {
    addPiecesToRoom(data.room, data.pieces);
    gameClass.updateRooms(allRooms);
    io.to(data.room).emit("UPDATE_PIECES", allRooms);
  });

  // Listen for manual disconnect
  client.on("DISCONNECT", (data) => {
    userLeave(data);
    playerClass.updatePlayers(allUsers);
    io.emit("REFRESH_USERSLIST", playerClass.players);
  });

  // Listen for disconnect on refresh (or any other case that is triggered automatically by socket.io)
  client.on("disconnect", () => {
    userLeave(client.id);
    userLeaveRoom(client.id);
    playerClass.updatePlayers(allUsers);
    gameClass.updateRooms(allRooms);
    io.emit("REFRESH_USERSLIST", playerClass.players);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
  });
});

http.listen(port, () => {
  console.log("\x1b[33m" + "LISTENING ON PORT ==> " + port + "\x1b[0m");
});
