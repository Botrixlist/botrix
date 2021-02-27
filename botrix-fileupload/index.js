const express = require('express');
const upload = require('express-fileupload')
const cors = require('cors');
var app = express();


app.use(upload());
app.use('/banner', express.static(__dirname+'/banners'))
app.use(cors());

console.log(__dirname+'/banners');

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
})

app.post('/uploadBanner', function(req, res) {
    console.log(req.files);
    if(req.files){
        
        var file = req.files.filename
        var filename = req.files.filename.name;

        if(!file.mimetype.includes('image')) return res.send('error');
        file.mv('./banners/'+filename, function(error){
            if(error){
                console.log(error);
                res.send(JSON.stringify({ status: "FAILED"}));
            } else {
                res.send({ status: true,  message: 'File is uploaded', data: { bannerURL: 'cdn.botrix.cc/banner/'+filename, status: "OK"} });
            }
        })

    } else{
        res.send(JSON.stringify({ status: "FAILED"}));
    }
})



function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

app.listen(80, (err) => {
    console.log("Botrix CDN Network is online");
});
