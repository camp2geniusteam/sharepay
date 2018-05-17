const getActivities = require("./handlers/getActivities");
const getActivity = require("./handlers/getActivity");
const getAllActivitiesByUser = require ("./handlers/getAllActivitiesByUser");
const getActivityHeader = require ("./handlers/getActivityHeader");
const getActivityHeaderNew = require ("./handlers/getActivityHeaderNew");
const saveActivityHeader = require ("./handlers/saveActivityHeader");

const express = require("express");
const app = express();
const nunjucks = require("nunjucks");

const port = process.env.PORT || 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

/**************Authentication****************/
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const authRouter = require("./services/authRouter");
// const authentication = require("./services/authentication");

// authentication.authentication(passport);

require("./services/authentication")(passport);


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(session({
  secret: "try try try",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/********************************************/

app.set("views", __dirname + "/views");
app.set("view engine", "njk");
app.use(express.static("public"));




app.get("/", authRouter);

app.get("/activities", getActivities);

app.get("/activitiesUser/:email",getAllActivitiesByUser);

app.get("/activities/:id/", getActivity);

app.get("/activityHeader/:id/", getActivityHeader);
app.get("/activityHeaderNew", getActivityHeaderNew);
app.post("/activityHeader", saveActivityHeader);


app.get("*", function(request, result) {
  result.send("page not found !!");
})

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
