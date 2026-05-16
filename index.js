const express = require("express");
const morgan = require("morgan");
const toolRouter = require("./routes/tool.route")
const app = express();
const dbConnection = require("./config/dbConnection");
const statusMessages = require("./utils/statusMessages")
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors())

dbConnection();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/tools",toolRouter)


app.all(/.*/, (req, res) => {
    return res.status(404).json({
        status: statusMessages.FAIL,
        data: {
            url: "The requested resource was not found on this server"
        }
    });
});

app.use(errorHandler)

app.listen(process.env.PORT ||3000, () => {
  console.log("App listening on port 3000");
});