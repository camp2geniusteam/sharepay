const getActivities = require("./handlers/getActivities");
const getActivity = require("./handlers/getActivity");

const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
nunjucks.configure("views", {
  autoescape: true,
  express: app
});
app.set("views", __dirname + "/views");
app.set("view engine", "njk");
app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get("/", getActivities);
app.get("/activities", getActivities);
app.get("/activities/:id/", getActivity);

app.get("*", function(request, result) {
  result.send("page not found !!");
})

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
