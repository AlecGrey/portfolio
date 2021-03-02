export function aboutLoad() {
    // GRAB PAGE ELEMENTS
    const aboutDiv = document.getElementById('about')
    const scrollBar = document.querySelector('.scroll-bar')
    const innerScrollBar = document.querySelector('.scroll-bar.inner')
    const scrollItems = document.querySelectorAll('.scroll-box > p')
    // ESTABLISH NEW TIMELINE
    const t1 = new TimelineMax()
    // reveal about page
    t1.set(aboutDiv, { display: 'block' })
    // reveal scroll bar
    t1.fromTo(scrollBar, 0.8, { height: '0%' }, { height: '100%' }, 0)
    // expand inner scrollbar
    t1.fromTo(
        innerScrollBar, 1,
        { height: '0%', bottom: '87.5%', alpha: 0 },
        { height: '25%', bottom: '75%', alpha: 1, ease: Power2.easeOut },
        0.8
    )
    // reveal scroll items
    let length = scrollItems.length
    for (let i = 0; i < length; i++) {
        let delay = (0.8 / length) * i
        t1.fromTo(
            scrollItems[length - i - 1], 1.5,
            { alpha: 0, x: '-10px' },
            { alpha: 1, x: 0, ease: Power2.easeOut },
            delay
        )
    }

    console.log(t1.totalDuration())
    return t1
}
// DISPLAY MUST BE SET TO 'NONE' BY end of first second!
export function aboutHide() {
    // GRAB PAGE ELEMENTS
    const aboutDiv = document.getElementById('about')
    const scrollBar = document.querySelector('.scroll-bar')
    const innerScrollBar = document.querySelector('.scroll-bar.inner')
    const scrollItems = document.querySelectorAll('.scroll-box > p')
    // ESTABLISH NEW TIMELINE
    const t1 = new TimelineMax()
    // scroll & hide inner bar
    t1.fromTo(innerScrollBar, 0.1, { height: '25%' }, { bottom: '0%', height: '0%', ease: Power3.easeOut }, 0)
    // scroll down the scroll bar
    t1.fromTo(scrollBar, 1, { height: '100%' }, { height: '0%', ease: Power3.easeOut }, 0)
    // hide each scroll item
    let j = 0
    for (let item of scrollItems) {
        t1.fromTo(
            item, 0.5 + j,
            { alpha: 1, xPercent: 0 },
            { alpha: 0, x: '-30px', ease: Power1.easeOut },
            0
        )
        j += (0.5 / scrollItems.length)
    }
    // hide about page
    t1.fromTo(aboutDiv, 0.1, { display: 'block' }, { display: 'none' }, 0.9)

    console.log(t1.totalDuration())
    return t1
}

export function scrollToItemByIndex(i) {
    // grab inner scroll bar
    const innerScrollBar = document.querySelector('.scroll-bar.inner')
    // find desired position
    const position = `${75 - (25 * i)}%`
    // set timeline
    const t1 = new TimelineMax()
    // move scrollbar to desired position
    t1.to(innerScrollBar, 1.5, { bottom: position, ease: Power3.easeOut })
}

export function scrollToPagePositionByClassName(className) {
    // set timeline
    const t1 = new TimelineMax()
    // scroll page to position
    t1.to(window, 1.5, { scrollTo: `.${className}-content`, ease: Power3.easeOut })
}

export function expandEducationContent(content) {
    const height = content.offsetHeight
    console.log(height)
    // set timeline
    const t1 = new TimelineMax({ paused: true, reversed: true })
    // expand div
    t1.fromTo(
        content, 0.7,
        { height: 0, autoAlpha: 0, display: 'none' }, 
        { height: height, autoAlpha: 1, display: 'block', ease: Power3.easeOut }
    )
    return t1
}