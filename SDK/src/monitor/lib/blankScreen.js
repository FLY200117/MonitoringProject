import onload from '../utils/onload'
import tracker from '../utils/tracker'

// 监听白屏
export function blankScreen() {
    let wrapperElements = ['html','body','#content']
    let emptyPoints = 0;

    // isWrapper来判断该元素是否渲染
    function isWrapper(element){
        let selector = getSelector(element);
        if(wrapperElements.indexOf(selector) != -1){
            emptyPoints++
        }
    }

    // 定义getselector去匹配节点是否有id和class
    function getSelector(element){
        if(element.id){
            return '#' + id;
        } else if(element.className) { // 匹配多个class a b c => .a.b.c
            return '.' + element.className.split(' ').filter(item => !!item).join('.')
        } else {
            return element.nodeName.toLowerCase()
        }
    }

    onload(function () {
        for(let i = 1;i <= 9;i++) {
            let xElements = document.elementsFromPoint(window.innerWidth * i / 10,window.innerHeight / 2)
            let yElements = document.elementsFromPoint(window.innerWidth / 2,window.innerHeight * i / 10)
            isWrapper(xElements[0])
            isWrapper(yElements[0])
        }
        if(emptyPoints > 0) {
            let centerElements = document.elementFromPoint(window.innerWidth / 2,window.innerHeight / 2)
            let log = {
                kind: 'stability',
                type: 'blank',
                emptyPoints: emptyPoints,
                screen: window.screen.width + 'X' + window.screen.height,
                viewPoint: window.innerWidth + 'X' + window.innerHeight,
                selector: getSelector(centerElements)
            }
            console.log('白屏error',log)
            tracker.send(log)
        }
    })
}