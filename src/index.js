const express = require("express");
const app = express();
const port = 4000;
const middleware = require("./middleware/auth.middleware");
const router = require("./routes/routes");


app.use(express.json());
app.use(middleware.tokenValidator);
app.use("/temp",router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
