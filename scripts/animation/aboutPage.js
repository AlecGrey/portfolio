export function aboutLoad() {
    // GRAB PAGE ELEMENTS
    const aboutDiv = document.getElementById('about')
    const scrollBar = document.querySelector('.scroll-bar')
    const circle = document.querySelector('.scroll-box > .circle')
    const scrollItems = document.querySelectorAll('.scroll-box > p')
    // ESTABLISH NEW TIMELINE
    const t1 = new TimelineMax()
    // reveal about page
    t1.fromTo(aboutDiv, 0.1, { display: 'none' }, { display: 'block' })
    // reveal scroll bar
    t1.fromTo(scrollBar, 0.8, { height: '0%' }, { height: '100%' }, 0)
    // circle animation: light up
    t1.fromTo(
        circle, 1,
        { alpha: 0 },
        { alpha: 1, ease: Power4.easeOut }
        // happens immediately after scrollbar finishes
    )
    t1.fromTo(
        circle, 0.3,
        { boxShadow: '0 0 0 0 white' },
        { boxShadow: '0 0 2.5rem 0.8rem white', ease: Power4.easeOut },
        '-=1'
    )
    t1.fromTo(
        circle, 0.4,
        { boxShadow: '0 0 2.5rem 0.8rem white' },
        { boxShadow: '0 0 2rem 0.5rem white', ease: Power3.easeOut },
        '-=0.7'
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
    const scrollItems = document.querySelectorAll('.scroll-box > p')
    // ESTABLISH NEW TIMELINE
    const t1 = new TimelineMax()
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