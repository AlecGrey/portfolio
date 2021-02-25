export default function navbarLoadAnimation() {
    // NAVBAR LINE
    const navLine = document.querySelector('div.nav-line.h-divider')
    // ALL NAV LINKS
    const nav1 = document.querySelector('li.nav-1 > a')
    const nav2 = document.querySelector('li.nav-2 > a')
    const nav3 = document.querySelector('li.nav-3 > a')
    const nav4 = document.querySelector('li.nav-4 > a')
    const innerNavs = [nav2, nav3]
    const outerNavs = [nav1, nav4]
    // ALL NAV CIRCLES
    const circle1 = document.querySelector('li.nav-1 > .circle')
    const circle2 = document.querySelector('li.nav-2 > .circle')
    const circle3 = document.querySelector('li.nav-3 > .circle')
    const circle4 = document.querySelector('li.nav-4 > .circle')
    const innerCircles=[circle2, circle3]
    const outerCircles=[circle1, circle4]
    // animation timeline
    const t1 = new TimelineMax()

    // animate navLine
    t1.fromTo(navLine, 1.5,
        { width: 0, backgroundColor: 'rgba(250, 250, 250, 0)', left: '50%' },
        { width: '100%', background: 'linear-gradient(90deg, rgba(250,250,250,0) 2%, rgba(250,250,250,1) 15%, rgba(250,250,250,1) 85%, rgba(250,250,250,0) 98%)', left: '0%' },
        0
    )
    // animate inner nav items
    t1.fromTo(innerNavs, 0.5,
        { alpha: 0, yPercent: -40 },
        { alpha: 1, yPercent: 0 },
        0.2
    )
    //  animate outer nav items
    t1.fromTo(outerNavs, 0.5,
        { alpha: 0, yPercent: -40 },
        { alpha: 1, yPercent: 0 },
        0.5
    )
    // fade-in animation on circles
    t1.fromTo(innerCircles, 0.8, { alpha: 0 }, { alpha: 1 }, 0.2)
    t1.fromTo(outerCircles, 0.8, { alpha: 0 }, { alpha: 1 }, 0.5)
}