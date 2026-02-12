const logger = require("./services/LoggerService")
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const router = require("./routes/routes");

app.use("/", router);

app.listen(3000, () => {
    logger.info("APP RUNNING ON PORT 3000")
})