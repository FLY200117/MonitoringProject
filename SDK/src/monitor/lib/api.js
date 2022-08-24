import tracker from '../utils/tracker'
// 监控所有api的请求
// 重写ajax的open和send方法，这样在axios上也能监听到api

export function injectXHR(){
    let XMLHHttpRequest = window.XMLHttpRequest;
    let originOpen = XMLHHttpRequest.prototype.open;
    let originSend = XMLHHttpRequest.prototype.send;
    
    XMLHHttpRequest.prototype.open = function (method,url,async) {
        if(!url.match(/4000/)) {
            this.logData = { method , url , async }
        }
        return originOpen.apply(this,arguments)
    }

    XMLHHttpRequest.prototype.send = function (body) {
        if(this.logData) {
            let startTime = Date.now();
            let handler = (type) => (e) => {
                let duration = Date.now() - startTime;
                let status = this.status;
                let statusText = this.statusText
                let log = {
                    kind: 'api',
                    type:'xhr',
                    eventType: type,
                    pathname: this.logData.url,
                    status: status + '-' + statusText,
                    duration: duration,
                    response: this.response?JSON.stringify(this.response) : '',
                    params: body || ''
                }
                tracker.send(log)
            }
            this.addEventListener('load',handler('load'),false);
            this.addEventListener('error',handler ('error'),false);
            this.addEventListener('abort',handler('abort'),false)
        }
        return originSend.apply(this,arguments)
    }
} 