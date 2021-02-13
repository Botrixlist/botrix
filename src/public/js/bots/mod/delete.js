function submit(){
    let reason = '';

    console.log(botId);
    if(document.getElementById('offline').checked) reason = document.getElementById('offline').value;
    if(document.getElementById('clone').checked) reason = document.getElementById('clone').value;
    if(document.getElementById('responds').checked) reason = document.getElementById('responds').value;
    if(document.getElementById('noCommands').checked) reason = document.getElementById('noCommands').value;
    if(document.getElementById('nsfw').checked) reason = document.getElementById('nsfw').value;
    if(document.getElementById('help').checked) reason = document.getElementById('help').value;
    if(!document.getElementById('help').value && reason == '') reason = "Unspecified reason";

    let data = {
        reason: reason
    }

    let url = `/api/delete/${botId}`
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