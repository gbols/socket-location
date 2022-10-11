const { hoistedIODriver } = require("./driversocket");
const { hoistedIOUser } = require("./usersocket");
const db = require("../models");

const configureSockets = (io, socket) => {
  return {
    driverLocation: hoistedIODriver(io, socket),
    userLocation: hoistedIOUser(io, socket),
  };
};

const onConnection = (io) => async (socket) => {
  console.log({ socket });
  const userGeo = await db.Geolocation.update(
    { socketID: socket.id },
    { where: { id: socket.theUser.id } }
  );
  const { userLocation, driverLocation } = configureSockets(io, socket);

  socket.on("user-move", userLocation);
  socket.on("driver-move", driverLocation);
};

module.exports = { onConnection };
