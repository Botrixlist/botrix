const { Router } = require('express');

const route = Router();

route.get("/", async (req, res, next) => {
    if(!localStorage.getItem("theme") == "nebula"){
        localStorage.setItem("theme", "dark")
        return res.redirect(req.header('Referer') || '/');
    } else {
        localStorage.setItem("theme", "nebula")
    }

    res.redirect(req.header('Referer') || '/');
})

module.exports = route;