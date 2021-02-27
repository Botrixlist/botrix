function onload(){
    document.getElementById('err').style.visibility  = "hidden"; 
}

function submit(){
    document.getElementById('submit').disabled = true;
    if (!document.getElementById('id').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.display  = "visible"; 
    }
    if (!document.getElementById('short').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.display  = "visible";  
    }
    if (!document.getElementById('long').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.display  = "visible";  
    }
    if (!document.getElementById('invite').value){
        document.getElementById('submit').disabled = false;
        document.getElementById('err').scrollIntoView();
        return document.getElementById('err').style.display  = "visible";  
    }

    let data = {
        id: document.getElementById('id').value,
        short: document.getElementById('short').value,
        long: document.getElementById('long').value,
        invite: document.getElementById('invite').value,
        tags: tags,
        webhook: document.getElementById('webhook').value || "none",
        owners: document.getElementById('owners').value,
        
    }

    let url = `/api/servers/submit`
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
