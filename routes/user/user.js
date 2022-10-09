const { Router } = require("express");
const db = require("../../models");
const { handleJwt } = require("../../utils/handleJwt");
const { userMiddleware } = require("../user/middleware");
const userRouter = Router();

userRouter.post("/signup", async (req, res, next) => {
  const {
    body: { firstName, lastName, email, password },
  } = req;
  const user = await db.User.create({ firstName, lastName, email, password });
  const token = handleJwt.signToken(user.dataValues);

  res.status(201).send({
    success: true,
    message: "user successfully created",
    user,
    token,
  });
});

userRouter.get("/", async (req, res, next) => {
  const users = await db.User.findAll();

  res.status(200).send({
    success: true,
    message: "users successfully retrieved",
    users,
  });
});

userRouter.post("/login", async (req, res, next) => {
  const {
    body: { email, password },
  } = req;
  const user = await db.User.findOne({ where: { email, password } });
  const token = handleJwt.signToken(user.dataValues);

  res.status(200).send({
    success: true,
    message: "user successfully retrieved",
    user,
    token,
  });
});

userRouter.put(
  "/:id",
  handleJwt.verifyToken,
  userMiddleware.userExists,
  async (req, res, next) => {
    const {
      body,
      params: { id },
      oldUser,
    } = req;

    if (id !== oldUser.id)
      res.status(403).send({
        success: false,
        message: "You are not authorized to carry out this action",
      });

    const [, [user]] = await db.User.update(
      {
        firstName: body.firstName || oldUser.firstName,
        lastName: body.lastName || oldUser.lastName,
        password: body.password || oldUser.password,
        email: body.email || oldUser.email,
      },
      { where: { id }, returning: true }
    );

    res.status(200).send({
      success: true,
      message: "user successfully updated",
      user,
    });
  }
);

userRouter.delete(
  "/:id",
  handleJwt.verifyToken,
  userMiddleware.userExists,
  async (req, res, next) => {
    const {
      params: { id },
      oldUser,
    } = req;

    if (id != oldUser.id)
      return res.status(403).send({
        success: false,
        message: "You are not authorized to carry out this action",
      });

    const users = await db.User.destroy({ where: { id } });

    return res.status(200).send({
      success: true,
      message: "user successfully deleted",
      users,
    });
  }
);

module.exports = { route: userRouter, name: "user" };
