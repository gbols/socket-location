const jwt = require("jsonwebtoken");

const handleJwt = {
  signToken: (data) => {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
      return token;
    } catch (error) {
      console.log({ error });
      throw new Error("There was a problem verifying your token", error);
    }
  },

  verifyToken: (req, res, next) => {
    try {
      const BearerToken = req.headers.authorization;
      const token = BearerToken.split(" ")[1];
      console.log({ token });
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = user;
      return next();
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "there was a problem decoding the token",
        error,
      });
    }
  },
};

module.exports = { handleJwt };
