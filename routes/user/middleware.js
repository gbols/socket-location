const db = require("../../models");

const userMiddleware = {
  userExists: async (req, res, next) => {
    const {
      params: { id },
    } = req;
    const user = await db.User.findByPk(id);
    if (!user)
      return res.status(404).send({
        success: true,
        message: "user not found",
        user,
      });

    req.oldUser = user;
    return next();
  },
};

module.exports = { userMiddleware };
