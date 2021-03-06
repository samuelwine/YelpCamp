var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "blah blah blah"
    }
]
 
function seedDB() {
    Campground.remove({}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("removed campgrounds!")
    }
})

data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
        if(err) {
            console.log(err)
        } else {
            console.log("added a campground");
            Comment.create({
                text: "this place is great",
                author: "Homer"
            }, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                campground.comments.push(comment);
                campground.save();
                console.log("created new comment")
            }}
            )
        }
    })
})

};
 module.exports = seedDB;
 