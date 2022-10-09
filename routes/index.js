const userRoute = require("./user/user");

const allRoutes = [userRoute];

const initializeRoutes = (app) => {
  allRoutes.forEach((router) => {
    app.use(`/api/v1/${router.name}`, router.route);
  });
  return app;
};

module.exports = { initializeRoutes };
