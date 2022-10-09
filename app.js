const express = require("express");
const { initializeRoutes } = require("./routes");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app = initializeRoutes(app);

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "welcome to the beginning of greatness",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
