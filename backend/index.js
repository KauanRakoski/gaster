const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const router = require("./routes/routes");

app.use("/", router);

app.listen(3000, () => {
    console.log("App running on port 3000");
})