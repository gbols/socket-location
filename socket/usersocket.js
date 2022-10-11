const { updateDbWithNewLocation } = require("./helpers");
const db = require("../models");

const hoistedIOUser = (io, socket) => {
  return async function driverLocation(payload) {
    console.log(
      `user-move event has been received with ${JSON.stringify(payload)} 🍅🍋`
    );
    const isOnline = await db.Geolocation.findByPk(payload.id);

    if (isOnline.dataValues.online) {
      const recipient = await updateDbWithNewLocation(payload, isOnline);

      if (recipient.trackerID) {
        const deliverTo = await db.Geolocation.findOne({
          where: { trackerID: recipient.trackerID },
        });
        const { socketID } = deliverTo.dataValues;

        io.to(socketID).emit("user:move", {
          location: recipient.location,
        });
      }
    }
  };
};

module.exports = { hoistedIOUser };
