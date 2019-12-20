var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(username, msg) {
    io.emit("chat message", username, msg);
  });
});

http.listen(port);
