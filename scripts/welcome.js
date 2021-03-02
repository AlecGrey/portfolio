export default function welcomeConstructor() {
    // pages contain static HTML blueprints & animations ONLY
    const page = {}

    // construction
    page.construct = addPageContent
    page.dismount = dismountPage

    // animation
    page.animations = {
        load: welcomeLoad,
        hide: welcomeHide
    }
    
    return page
}

// ===============
// HELPER METHODS
// ===============
function addPageContent() {
    // get main div
    const main = document.getElementById('main')
    // construct about page information
    const welcomeDiv = document.createElement('div')
    welcomeDiv.id = 'welcome'
    // add all inner content to div
    welcomeDiv.innerHTML = `
        <div id='welcome-bg-img'></div>
        <div class='content'>
            <h1 class='main-heading'>Hi, my name is <span>Alec</span>.</h1>
            <p class='welcome-statements'>
                I am a <span>Full-Stack Engineer</span>,</p>
            <p class='welcome-statements'>with a love for <span>creative problem solving</span>,</p>
            <p class='welcome-statements'>and developing <span>sharp</span>, <span>modern</span> user interfaces.</p>
            </p>
            <h3 class='welcome-h3'>// Learn more <span>about</span> me.</h3>
        </div>
    `
    main.appendChild(welcomeDiv)
}

function dismountPage() {
    document.getElementById('welcome').remove()
}

// ===============
//    ANIMATIONS
// ===============

function welcomeLoad() {
    // WELCOME PAGE IMAGE
    const welcomeImg = document.getElementById('welcome-bg-img')
    // WELCOME HEADER
    const welcomeHeader = document.querySelector('.main-heading')
    const welcomeStatements = document.querySelectorAll('.welcome-statements')
    const welcomeH3 = document.querySelector('h3.welcome-h3')
    // INSTATIATE TIMELINE
    const t1 = new TimelineMax()
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

    console.log(t1.totalDuration())
    return t1
}
// DISPLAY MUST BE SET TO 'NONE' BY end of first second!
function welcomeHide() {
    // WELCOME PAGE IMAGE
    const welcomeDiv = document.getElementById('welcome')
    const welcomeImg = document.getElementById('welcome-bg-img')
    // WELCOME HEADER
    const welcomeHeader = document.querySelector('.main-heading')
    const welcomeStatements = document.querySelectorAll('.welcome-statements')
    const welcomeH3 = document.querySelector('h3.welcome-h3')
    // INSTANTIATE TIMELINE
    const t1 = new TimelineMax({ onComplete: dismountPage })
    // hide all welcome elements back to front
    t1.fromTo(
        welcomeH3, 0.5,
        { alpha: 1, xPercent: 0 },
        { alpha: 0, xPercent: 1 }
    )
    let elements = [welcomeHeader, ...welcomeStatements]
    let j = 0.2
    for (let i = elements.length - 1; i >= 0; i--) {
        t1.fromTo(
            elements[i], 0.5+j,
            { alpha: 1, xPercent: 0 },
            { alpha: 0, xPercent: 1 },
            0
        )
        j += 0.1
    }
    // hide background image
    t1.fromTo(welcomeImg, 0.5, { opacity: 1 }, { opacity: 0 }, 0)
    // hide welcome page
    t1.fromTo(welcomeDiv, 0.1, { display: 'block' }, { display: 'none' }, 0.9)
    
    console.log(t1.totalDuration())
    return t1
}