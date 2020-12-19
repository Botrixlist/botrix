function onload(){
    document.getElementById('err').style.visibility  = "hidden"; 
}

function submit(){
    let botId = location.href.split(location.host)[1].replace('/edit/', '').replace('/','');
    let website = '/';
    if(document.getElementById('web').value){
        website = document.getElementById('web').value;
    }
    document.getElementById('submit').disabled = true;
    if (!document.getElementById('id').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.visibility  = "visible"; 
    }
    if (!document.getElementById('prefix').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.visibility  = "visible";  
    }
    if (!document.getElementById('short').value){ 
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.visibility  = "visible";  
    }
    if (!document.getElementById('long').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.visibility  = "visible";  
    }
    if (!document.getElementById('support').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.visibility  = "visible";
    }
    if (!document.getElementById('library').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.visibility  = "visible"; 
    }

    let data = {
        id: document.getElementById('id').value,
        prefix: document.getElementById('prefix').value,
        short: document.getElementById('short').value,
        support: document.getElementById('support').value,
        web:website,
        invite: document.getElementById('invite').value,
        library: document.getElementById('library').value,
        long: document.getElementById('long').value,
        tags: tags,
        webhook: document.getElementById('webhook').value || "none",
        bannerUrl: `https://cdn.botrix.cc/banner/`+uploadedUrl
    }

    let url = `/api/resubmit/${botId}`
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