const express = require("express");
const indexRoutes = express.Router();
const User = require("../models/User");
const Snippet = require("../models/Snippet");

indexRoutes.get("/", (req, res) => {
    User.find().then(foundUsers => {
        // console.log(foundUsers);
        if (!foundUsers) {
            res.status(500).send(err);
        }
        res.render("index", { codeSnippetOrganizer: Snippet });//sets what the first page is
    });
})

indexRoutes.get("/:trashroute", (req, res) => {
    res.send("You've tried to visit a page that doesn't exist.");//sets what the first page is

});



module.exports = indexRoutes;  