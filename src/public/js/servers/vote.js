async function submit(){
    let serverID = document.getElementById('submit').getAttribute('Serverid');
    console.log(serverID)
    var v = grecaptcha.getResponse();
    if(v.length == 1){
        alert('Please complete the captcha~!');
    } else { 
        window.location = `/api/servers/vote/${serverID}`
    }
}

var onloadCallback = function() {
    grecaptcha.render('html_element', {
      'sitekey' : '6LfCmcQZAAAAAE0WHXmb9nqMgMQmUwmBmbV76BuU'
    });
};