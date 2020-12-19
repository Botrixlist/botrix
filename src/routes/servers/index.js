const express = require('express');
const router = express.Router()
const servers_ = require('../../models/servers');
const config = require('../../config.json');
const add = require('./add');
const edit = require('./edit');
const search = require('../servers/search');
const servers = require('./server');
const vote = require('./vote');


router.use('/vote', vote);
router.use('/add', add);
router.use('/search', search);
router.use('/server', servers);
router.use('/edit', edit);

router.get('/', async (req, res, next) => {

    let tagDict = new Object();
    tagDict.data = {}
    let featured = await servers_.find({});

    featured.forEach(server => {
        server.tags.forEach(tag => {
            if(!tagDict.data[tag.toLowerCase()]){
                tagDict.data[tag.toLowerCase()] = {
                    key: 0,
                    name: tag
                }
            } else {
               let key = tagDict.data[tag.toLowerCase()].key

                tagDict.data[tag.toLowerCase()] = {
                    key: key += 1,
                    name: tag
                }
            } 
        });
    });

    const ordered = {};
    Object.keys(tagDict).sort().forEach(function(key) {
        ordered[key] = tagDict[key];
    });

    const orderedArr = [];

    for (const tag in ordered.data) {
        if (ordered.data[tag]) {
            orderedArr.push({ tag: tag, key: ordered.data[tag].key })
        }
    } 
    
    let displayArr = [];

    if(orderedArr.length > 5){
        for(let i = 0; i <= 5;i++){
            if(orderedArr[i] !== ""){
              
                displayArr.push(orderedArr[i]);
            }
        }
    } else {
        displayArr = orderedArr;
    }


    const bumped = featured.sort((a, b) => b.bumped - a.bumped);

    bumped.forEach(server => {
      
    })

    let isAdmin = false;    
    if(req.user){
        if(config.ADMIN_USERS.includes(req.user.id)){
            isAdmin = true;
        }
    }
    var data = {
        user: req.user,
        featured: bumped,
        isAdmin: isAdmin,
        ordered:bumped,
        tags: displayArr
    }
    res.render("servers/index", data);
});



module.exports = router