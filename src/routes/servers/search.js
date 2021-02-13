const {Router} = require('express');
const Servers = require('../../models/servers');

const route = Router();

route.get("/", async (req, res, next) =>  {

    let servers = await Servers.find({});
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    let serverArr = servers;
    var url = new URL(fullUrl);
    var search_params = url.searchParams; 
    
    if(search_params.get('search')){
        serverArr = await searchBots(servers, search_params.get('search'))
       
    }

    if(search_params.get('filter')){
        let filterType = search_params.get('filter');
        serverArr = searchFilter(servers, filterType)
    }

    let data = {
        user: req.user,
        server: serverArr
    }
    res.render("servers/search", data);

})

function searchFilter(botArr, filter){
    filteredArray = [];
 
    switch(filter){
        case "atz":
            filteredArray = botArr.sort(function(a, b) {
                var nameA = a.name.toUpperCase(); 
                var nameB = b.name.toUpperCase();
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
                var nameA = a.name.toUpperCase(); 
                var nameB = b.name.toUpperCase();
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
        if(botArr[i].name.toLowerCase().includes(item.toLowerCase())){
            confidence += 0.4;
        } 

        if(botArr[i].short.toLowerCase().includes(item.toLowerCase())){
            confidence += 0.3;
        }
        
        botArr[i].tags.forEach(tag =>{
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
        console.log(`[/routes/servers/search.js] Confidence for: ${serchConfidence[i].card.name}  Level: ${serchConfidence[i].confidence}`);
        finalArr.push(serchConfidence[i].card);
    }
    return finalArr;
}
module.exports = route;