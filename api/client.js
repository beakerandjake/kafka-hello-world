import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3000/stocks/realtime");

ws.on("error", console.error);

ws.on("open", () => {
  setInterval(() => {
    ws.send("hi from client!!!");
  }, 3000);
});

ws.on("message", (data) => {
  console.log("received: %s", data);
});

console.log("hello");
