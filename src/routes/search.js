const {Router} = require('express');
const bot = require('../models/bots');
const wallet = require('../models/wallet');
const { search } = require('./api/routes');

const route = Router();

route.get("/", async (req, res, next) =>  {
    let walletUser;
    if(req.user)   walletUser = await wallet.findOne({ userid: req.user.id });
    let bots = await bot.find({state: "verified"}).sort({ votes: "descending" });
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let botArr = bots;
    var url = new URL(fullUrl);
    var search_params = url.searchParams; 
    
    if(search_params.get('search')){
        botArr = await searchBots(bots, search_params.get('search'))
  
    }

    if(search_params.get('filter')){
        let filterType = search_params.get('filter');
        botArr = searchFilter(bots, filterType)
    }

    let data = {
        user: req.user,
        bot: botArr,
        wallet: req.session
    }
    res.render("search", data);

})

function searchFilter(botArr, filter){
    filteredArray = [];
   
    switch(filter){
        case "atz":
            filteredArray = botArr.sort(function(a, b) {
                var nameA = a.username.toUpperCase(); 
                var nameB = b.username.toUpperCase();
                if (nameA < nameB) {
                  return -1; 
                }
                if (nameA > nameB) {
                  return 1; 
                }
                return 0; 
              });
            break;
        case "zta":
            filteredArray = botArr.sort(function(a, b) {
                var nameA = a.username.toUpperCase(); 
                var nameB = b.username.toUpperCase();
                if (nameA > nameB) {
                  return -1; 
                }
                if (nameA <nameB) {
                  return 1; 
                }
                return 0; 
              });
            break;
        case "lth":
            filteredArray = botArr.sort((a, b) => parseFloat(a.votes) - parseFloat(b.votes));
            break;       

    }

    return filteredArray
}

async function searchBots(botArr, item) {

    var serchConfidence = [];

    for(var i = 0; i < botArr.length; i++){
        
        let confidence = 0;
        if(botArr[i].username.toLowerCase().includes(item.toLowerCase())){
            confidence += 0.4;
        } 

        if(botArr[i].description.toLowerCase().includes(item.toLowerCase())){
            confidence += 0.3;
        }
        
        botArr[i].botTags.forEach(tag =>{
            if(tag.toLowerCase().includes(item.toLowerCase())){
                confidence += 0.3;
            }
        })
    
        if(!confidence == 0){
            serchConfidence.push({
                card: botArr[i],
                confidence: confidence
            })
        }
    }

    serchConfidence.sort(function(a, b){
        return parseFloat(a.confidence) - parseFloat(b.confidence)
    });
    var finalArr = [];- 1
    for(var i = serchConfidence.length - 1; i > -1; i--){
        console.log(`[/routes/search.js] Confidence for: ${serchConfidence[i].card.username}  Level: ${serchConfidence[i].confidence}`);
        finalArr.push(serchConfidence[i].card);
    }
    return finalArr;
}
module.exports = route;