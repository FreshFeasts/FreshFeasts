const io = require("socket.io-client");
const socket = io("http://44.211.123.112:3005");

var nickname = null;
console.log("Connecting to the server...");

// connect to server
socket.on("connect", () => {
    nickname = process.argv[2];
    console.log("[INFO]: Welcome %s", nickname);
    // emit join event
    socket.emit("join", {"sender": nickname, "action": "join"});
});

// disconnet from server
socket.on("disconnect", (reason) => {
    console.log("[INFO]: Client disconnected, reason: %s", reason);
});

// console log connection errors
socket.on('connect_error', err => console.log(err))
socket.on('connect_failed', err => console.log(err))
socket.on('disconnect', err => console.log(err))


// input and read the output given by the clients
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// emit line event whenever the input stream receives an end-of-line input (\n, \r, or \r\n)
rl.on("line", (input) => {
  if (true === input.startsWith("b;")) {
      var str = input.slice(2);
      // send the broadcast event with its payload in JSON format to the server
      socket.emit("broadcast", {"sender": nickname, "action": "broadcast", "msg": str});
    } else if (true === input.startsWith("c;")) {
      var str = input.slice(2);
      socket.emit('chat message', {"sender": nickname, "action": "chat", "msg": str});
  }
  else if ("ls;" === input) {
      socket.emit("list", {"sender": nickname, "action": "list"});
  } else if ("q;" === input) {
    socket.emit("quit", {"sender": nickname, "action": "quit"});
  }
});

// display messages of other clients in our client
socket.on("broadcast", (data) => {
  console.log("%s", data.msg);
});

socket.on('chat message', (msg) => {
  console.log('New message:', msg);
});

// listen to the notification emitted from the server and displays it in our client
socket.on("join", (data) => {
  console.log("[INFO]: %s has joined the chat", data.sender);
});

// print out the list of the clients in our client
socket.on("list", (data) => {
  console.log("[INFO]: List of nicknames:");
  for (var i = 0; i < data.users.length; i++) {
      console.log(data.users[i]);
  }
});

// receive notification from the server when other clients quit the chat
socket.on("quit", (data) => {
  console.log("[INFO]: %s quit the chat", data.sender);
});

