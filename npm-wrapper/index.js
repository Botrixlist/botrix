const axios = require('axios')

class botrix{   
    constructor(apiKey){
        this.apiKey = apiKey
        this.baseURL = `https://botrix.cc/api/v1/`;
    }


    /**
     * Get's a bot by it's id
     * Requires API key
     * @param botid
     */
    getBot(botid){
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseURL}bot/${botid}`,   {headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }}).then((res) => {
                resolve(res.data)    
            }).catch((err) => {
                reject(err);
            })
        })
    }

    /**
     * Get's the user
     * @param userid
     */
    getUser(userid){
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseURL}user/${userid}`,   {headers: {
                'Authorization': 'Bearer ' + this.apiKey
            }}).then((res) => {
                resolve(res.data)    
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

module.exports = botrix;