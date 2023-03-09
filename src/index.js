const express = require("express");
const app = express();
const port = 4000;
const middleware = require("./middleware/auth.middleware");
const typeRouter = require("./routes/type.routes");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(middleware.tokenValidator);

app.use("/type",typeRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
