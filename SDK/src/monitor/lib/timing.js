import onload from '../utils/onload'
import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector';
import tracker from '../utils/tracker'


// 监听性能参数
export function timimg() {
    let FMP, LCP;
    // 增加一个性能条目的观察者
    new PerformanceObserver((entryList,observer) => {
        let perEntries = entryList.getEntries();
        FMP = perEntries[0]
        observer.disconnect();//不再观察
    }).observe({ entryTypes: ['element']});//观察页面中的元素

    new PerformanceObserver((entryList,observer) => {
        let perEntries = entryList.getEntries();
        LCP = perEntries[0]
        observer.disconnect();
    }).observe({ entryTypes: ['largest-contentful-paint']});

    new PerformanceObserver((entryList,observer) => {
        let lastEvent = getLastEvent()
        let firstInput = entryList.getEntries()[0];
        if(firstInput){
            // processingStart是开始处理的时间，startTime是开始点击的时间，差值就是处理的延迟
            let inputDelay = firstInput.processingStart - firstInput.startTime
            let duration = firstInput.duration //处理的耗时
            if(inputDelay > 0 || duration > 0){
                let log = {
                    kind: 'experience',
                    type: 'firstInputDelay', //首次输入延迟
                    inputDelay: inputDelay, //延迟的时间
                    duration: duration, //处理的时间
                    startTime: firstInput.startTime,
                    selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''  
                }
                tracker.send(log)
            }
        }
        observer.disconnect();
    }).observe({ type: 'first-input' ,buffered: true});

    onload(function () {
        setTimeout(() => {
            const {
                fetchStart,
                connectStart,
                connectEnd,
                responseStart,
                responseEnd,
                requestStart,
                domLoading,
                domInteractive,
                domContentLoadedEventStart,
                domContentLoadedEventEnd,
                loadEventStart,
                loadEventEnd
            } = performance.timing
            // 以下log中的时间单位为毫秒
            let log = {
                kind: 'experience',
                type: 'timing',
                connectTime: connectEnd - connectStart,//连接时间
                ttfbTime: responseStart - requestStart,//首字节到达时间
                responseTime: responseEnd - responseStart,//响应的读取时间
                parseDOMTime: loadEventStart - domLoading,//DOM解析的时间
                domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,//DOM内容加载时间
                timeToInteractive: domInteractive - fetchStart,//首次可交互时间
                loadTime: loadEventStart - fetchStart//完整加载时间
            }
            tracker.send(log)

            let FP = performance.getEntriesByName('first-paint')[0]
            let FCP = performance.getEntriesByName('first-contentful-paint')[0]
            // 开始发送性能指标
                console.log('FP',FP)
                console.log('FCP',FCP)
                console.log('FMP',FMP)
                console.log('LCP',LCP)

            let log2 = {
                kind: 'experience',
                type: 'paint',
                firstPaint: FP.startTime,
                firstContentfulPaint: FCP.startTime,
                firstMeaningfulPaint: FMP.startTime,
                largestContentfulPaint: LCP.startTime
            }
            tracker.send(log2)
        }, 3000);
    })
}