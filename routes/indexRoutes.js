const express = require("express");
const indexRoutes = express.Router();
const User = require("../models/User");
const Snippet = require("../models/Snippet");


indexRoutes.get("/", (req, res) => {
    Snippet.find().then(foundSnippets => {
        // console.log(foundSnippets);
        if (!foundSnippets) {
            res.status(500).send(err);
        }
        res.render("index", { snippets: foundSnippets });//sets what the first page is
    });
})

///////SEARCH SNIPPETS BY LANGUAGE
indexRoutes.post("/language/", (req, res) => {
    console.log(req.body);
    let query = { $and: [] };

    if (req.body.language) {
        let queryLang = new RegExp("^" + req.body.language, "i")
        query["$and"].push({ language: queryLang });
    }

    if (req.body.tag) {
        query["$and"].push({ tag: req.body.tag })
    }

    // Snippet.find({ language: req.body.language }).then(foundSnippets => {
    Snippet.find(query).then(foundSnippets => {
        console.log('foundSnippets: ', foundSnippets);
        if (!foundSnippets) {
            res.status(500).send(err);
        }
        res.render("index", { snippets: foundSnippets })
    })
})



///create new one
indexRoutes.post("/createNew", (req, res) => {
    let newSnippet = new Snippet(req.body);
    newSnippet
        .save()
        .then(function (savedSnippet) {
            res.redirect("/");
        })
        .catch(function (err) {
            return res.status(500).send("Error saving Snippet!");
        });
});


indexRoutes.get("/:trashroute", (req, res) => {
    res.send("You've tried to visit a page that doesn't exist.");

});


//////search by tagno



////view the snippet 



module.exports = indexRoutes;  