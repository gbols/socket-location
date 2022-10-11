const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const db = require("./models");
const { initializeRoutes } = require("./routes");
const { onConnection } = require("./socket");

let app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app = initializeRoutes(app);
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "welcome to the beginning of greatness",
  });
});
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  if (socket.handshake.headers.auth) {
    const { auth } = socket.handshake.headers;
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        throw new Error("Authentication error, Invalid Token supplied");
      }
      const theUser = await db.User.findByPk(decodedToken.id);
      if (!theUser)
        throw new Error(
          "Invalid Email or Password, Kindly contact the admin if this is an anomaly"
        );
      socket.theUser = theUser;
      return next();
    });
  } else {
    throw new Error("Authentication error, Please provide a token");
  }
});

io.on("connection", onConnection(io));

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
