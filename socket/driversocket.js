const { updateDbWithNewLocation } = require("./helpers");
const db = require("../models");

const hoistedIODriver = (io, socket) => {
  return async function driverLocation(payload) {
    console.log(`driver-move event has been received with ${payload} 🐥🥶`);

    const isOnline = await db.Geolocation.findByPk(payload.id);

    if (isOnline.dataValues.online) {
      const recipient = await updateDbWithNewLocation(payload, isOnline);

      if (recipient.trackerID) {
        const deliverTo = await db.Geolocation.findOne({
          where: { trackerID: recipient.trackerID },
        });
        const { socketID } = deliverTo.dataValues;

        io.to(socketID).emit("driver:move", {
          location: recipient.location,
        });
      }
    }
  };
};

module.exports = { hoistedIODriver };
