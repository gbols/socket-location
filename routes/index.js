const userRoute = require("./user/user");
const trackRoute = require("./track/tracker");

const allRoutes = [userRoute, trackRoute];

const initializeRoutes = (app) => {
  allRoutes.forEach((router) => {
    app.use(`/api/v1/${router.name}`, router.route);
  });
  return app;
};

module.exports = { initializeRoutes };
