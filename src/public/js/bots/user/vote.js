async function submit(){
    let botId = location.href.split(location.host)[1].replace('/vote/', '').replace('/','');
    var v = grecaptcha.getResponse();
    console.log(v);
    if(v.length == 0){
        alert('Please complete the captcha~!');
    } else { 
        window.location = `/api/vote/${botId}`
    }
}

var onloadCallback = function() {
    grecaptcha.render('html_element', {
      'sitekey' : '6LfCmcQZAAAAAE0WHXmb9nqMgMQmUwmBmbV76BuU'
    });
};