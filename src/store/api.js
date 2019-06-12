import axios from 'axios'

let client = axios.create({
    baseURL:   'http://localhost:5000',
})

export default {
    predict : function(data){
        var jsData = JSON.stringify(data)
        jsData = jsData.replace(/{/g,"")
        jsData = jsData.replace(/}/g,"")
        jsData = jsData.replace(/:/g,"=")
        jsData = jsData.replace(/,/g,"&")
        jsData = jsData.replace(/"/g,"")        
        return client.get('/?' + jsData)
    }

}