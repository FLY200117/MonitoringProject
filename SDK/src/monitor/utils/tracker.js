let BaseURL = 'http://localhost:4000/' //后端地址
let userAgent = require('user-agent')

function getBasicData() {
    return {
        title: document.title,
        url: location.href,
        timestamp: Date.now(),
        userAgent: userAgent.parse(navigator.userAgent)
    }
}

class SendTracker {
    constructor() {
        this.url = `${BaseURL}`; // 上报路径
        this.xhr = new XMLHttpRequest;
    }

    send(data = {}) {
        console.log(data.type + '已发送')   
        const BasicData = getBasicData()
        const Data = { ...BasicData,...data }
        // console.log('Data:',Data)

        const xhr = this.xhr
        xhr.open('PUT',this.url + `${data.kind}`,true)
        let body = JSON.stringify(Data)
        console.log(body)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('bodyrawsize', body.length)
        xhr.onload = () => {
            // console.log(xhr.response)
        }

        xhr.onerror = (err) => {
            // console.log(err)
        }
        
        xhr.send(body)
    }
}

export default new SendTracker()