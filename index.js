const express = require("express");
const morgan = require("morgan");
const toolRouter = require("./routes/tool.route")
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/tools",toolRouter)



app.listen(3000, () => {
  console.log("App listening on port 3000");
});