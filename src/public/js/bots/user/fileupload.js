
document.addEventListener('load', () => {
    let uploadedUrl;
    // select file input
    const bannerInput = document.getElementById('banner');
    
    const uploadFile = (file) => {
    
        // add file to FormData object
        const fd = new FormData();
        fd.append('filename', file);
    
        // send `POST` request
        fetch('https://cdn.botrix.cc/uploadBanner', {
            method: 'POST',
            body: fd
        })
        .then(res => {
            document.getElementById("bannerImage").src = `https://cdn.botrix.cc/banner/${uploadedUrl}`;
            document.getElementById("banenrImage").style.height  = "100px";
            uploadedUrl = `https://cdn.botrix.cc/banner/${uploadedUrl}`;
        })
        .then(json => console.log(json))
        .catch(err => console.error(err));
    }
    
    // add event listener
    bannerInput.addEventListener('change', async () => {
        uploadedUrl = `banner_${makeid(16)}.png`;
        var blob = await bannerInput.files[0].slice(0, bannerInput.files[0].size, 'image/png'); 
        var newFile = await new File([blob], uploadedUrl, {type: 'image/png'});
        await uploadFile(newFile);
    });
    
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
})
