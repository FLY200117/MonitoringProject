let lastEvent
['click','touchstart','mousedown','keydown','mouseover'].forEach(eventType => {
    document.addEventListener(eventType, (e) => {
        lastEvent = e
    },{
        capture: true,
        passive: true
    })
})

export default function () {
    return lastEvent
}