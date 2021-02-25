export function welcomeLoad() {
    // WELCOME PAGE IMAGE
    const welcomeDiv = document.getElementById('welcome')
    const welcomeImg = document.getElementById('welcome-bg-img')
    // WELCOME HEADER
    const welcomeHeader = document.querySelector('.main-heading')
    const welcomeStatements = document.querySelectorAll('.welcome-statements')
    const welcomeH3 = document.querySelector('h3.welcome-h3')
    // INSTATIATE TIMELINE
    const t1 = new TimelineMax()
    // reveal welcome div
    t1.fromTo(welcomeDiv, 0.1, { display: 'none' }, { display: 'block' })
    // fade-in welcome image
    t1.fromTo(welcomeImg, 0.8, { opacity: 0 }, { opacity: 1 }, 0)
    // consistent fade-in with all welcome elements
    for (let element of [welcomeHeader, ...welcomeStatements, welcomeH3]) {
        t1.fromTo(
            element, 0.5,
            { alpha: 0, xPercent: 1 },
            { alpha: 1, xPercent: 0 },
            '-=0.4'
        )
    }
}

export function welcomeHide() {
    // WELCOME PAGE IMAGE
    const welcomeDiv = document.getElementById('welcome')
    const welcomeImg = document.getElementById('welcome-bg-img')
    // WELCOME HEADER
    const welcomeHeader = document.querySelector('.main-heading')
    const welcomeStatements = document.querySelectorAll('.welcome-statements')
    const welcomeH3 = document.querySelector('h3.welcome-h3')
    // INSTANTIATE TIMELINE
    const t1 = new TimelineMax()
    // hide all welcome elements back to front
    t1.fromTo(
        welcomeH3, 0.5,
        { alpha: 1, xPercent: 0 },
        { alpha: 0, xPercent: 1 }
    )
    let elements = [welcomeHeader, ...welcomeStatements]
    console.log(elements.length)
    for (let i = elements.length - 1; i >= 0; i--) {
        t1.fromTo(
            elements[i], 0.5,
            { alpha: 1, xPercent: 0 },
            { alpha: 0, xPercent: 1 },
            '-=0.4'
        )
    }
    // hide background image
    t1.fromTo(welcomeImg, 0.5, { opacity: 1 }, { opacity: 0 }, 0)
    // hide welcome page
    t1.fromTo(welcomeDiv, 0.1, { display: 'block' }, { display: 'none' })
}