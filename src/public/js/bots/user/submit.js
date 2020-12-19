function onLoading(){
}

function submit(){
    document.getElementById('err1').style.display  = "none"; 
    document.getElementById('err2').style.display  = "none"; 
    document.getElementById('err3').style.display  = "none"; 
    document.getElementById('err4').style.display  = "none"; 
    document.getElementById('err5').style.display  = "none"; 
    document.getElementById('err6').style.display  = "none"; 
    document.getElementById('submit').disabled = true;
    let website = '/';
    if(document.getElementById('web').value){
        website = document.getElementById('web').value;
    }
    if(!uploadedUrl) uploadedUrl = 'https://cdn.discordapp.com/attachments/735022938419363891/754635158958768138/wp4462550.png';
    if (!document.getElementById('id').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err1').style.display  = "block"; 
        return document.getElementById('err1').scrollIntoView({inline: "center", behavior: "smooth"});
    }
    if (!document.getElementById('prefix').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err2').style.display  = "block"; 
        return document.getElementById('err2').scrollIntoView({inline: "center", behavior: "smooth"});
    }
    if (!document.getElementById('short').value){ 
        document.getElementById('submit').disabled = false;
        document.getElementById('err3').style.display  = "block"; 
        return document.getElementById('err3').scrollIntoView({inline: "center", behavior: "smooth"});
    }
    if (!document.getElementById('long').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err4').style.display  = "block"; 
        return document.getElementById('err4').scrollIntoView({inline: "center", behavior: "smooth"});
    }
    if (!document.getElementById('support').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err5').style.display  = "block"; 
        return document.getElementById('err5').scrollIntoView({inline: "center", behavior: "smooth"});
    }
    if (!document.getElementById('long').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err6').style.display  = "block"; 
        return document.getElementById('err6').scrollIntoView({inline: "center", behavior: "smooth"});
    }

    let data = {
        id: document.getElementById('id').value,
        prefix: document.getElementById('prefix').value,
        short: document.getElementById('short').value,
        support: document.getElementById('support').value,
        web: website,
        invite: document.getElementById('invite').value,
        library: document.getElementById('library').value,
        long: document.getElementById('long').value,
        tags: tags,
        webhook: document.getElementById('webhook').value || "none",
        additionals: document.getElementById('additionals').value,
        bannerUrl:`https://cdn.botrix.cc/banner/`+ uploadedUrl
    }

    let url = `/api/submit`
    console.log('submited');
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(response => {
        location.href = response.redirect
    })
}
