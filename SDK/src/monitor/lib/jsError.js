import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker'


// 监听js错误
export function injectJsError () {
    window.addEventListener('error',function(e){
        console.log("error")
        let lastEvent = getLastEvent(); // 最后一个交互事件

        // 脚本加载错误
        if(e.target && (e.target.src || e.target.href)) {
            let log = {
                kind: 'stability',
                type: 'error',
                errorType: 'resourceError', 
                filename: e.target.src || e.target.href ,
                tagName: e.target.tagName,
                selector:getSelector(e.target) //获取最后一个操作的元素
            }
            tracker.send(log)
        } else {
            let log = {
                kind: 'stability',
                type: 'error',
                errorType: 'jsError',
                message: e.message,
                filename: e.filename,
                position: `${e.lineno}:${e.colno}`,
                stack: getLines(e.error.stack),
                selector: lastEvent ? getSelector(lastEvent.path) : '' //获取最后一个操作的元素
            }
            tracker.send(log)
        }
        return true
    }, true)

    window.addEventListener('unhandledrejection', (e) => {
        let lastEvent = getLastEvent()
        let message
        let filename;
        let line = 0;
        let colno = 0;
        let stack = '';
        let reason = e.reason
        if(typeof reason === 'string'){
            message = reason;
        } else if (typeof reason === 'object'){ // 是一个错误对象
            message = reason.message
            if(reason.stack) {
                let matchResult = reason.stack.match(/at\s+.+:(\d+):(\d+)/)
                filename = matchResult[1]
                line = matchResult[2];
                colno = matchResult[3]
            }
            stack = getLines(reason.stack)
        }
        let log = {
            kind: 'stability',
            type: 'error',
            errorType: 'promiseError',
            url: '',
            timestamp: e.timeStamp,
            message: message,
            filename: filename,
            position: `${line}:${colno}`,
            stack: stack,
            selector: lastEvent ? getSelector(lastEvent.path) : '' //获取最后一个操作的元素
        }
        tracker.send(log)
    },true)

    function getLines(stack){
        return stack.split('\n').splice(1).map(item => item.replace(/^\s+at\s+/g, "")).join('^')
    }
}
