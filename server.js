const getActivities = require("./handlers/getActivities");
const getActivity = require("./handlers/getActivity");

const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const port = process.env.PORT || 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app
});


app.set("views", __dirname + "/views");
app.set("view engine", "njk");
app.use(express.static("public"));



app.get("/", getActivities);
app.get("/activities", getActivities);
app.get("/activities/:id/", getActivity);

app.get("*", function(request, result) {
  result.send("page not found !!");
})

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
