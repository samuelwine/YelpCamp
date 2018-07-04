var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");
var Session = require("express-session");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var indexRoutes = require("./routes/index");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");

//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://shmuel:11FortRoad@ds127961.mlab.com:27961/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));	
app.use(methodOverride("_method"))
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(Session(
    {
        secret: "hello and goodbye",
        resave: false,
        saveUninitialized: false,
    }
));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});

app.get("/", (req, res) => {
    res.render("landing");;
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The YelpCamp server has started!");
})