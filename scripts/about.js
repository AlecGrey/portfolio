export default function aboutConstructor() {
    const page = {}

    // construction
    page.construct = addPageContent
    page.dismount = dismountPage

    // animation
    page.animations = {
        load: aboutLoad,
        hide: aboutHide
    }

    // add event listeners
    page.addPageEvents = addPageEvents

    return page
}

// ===============
// HELPER METHODS
// ===============

function addPageContent() {
    // get main div
    const main = document.getElementById('main')
    // construct about page information
    const aboutDiv = document.createElement('div')
    aboutDiv.id = 'about'
    // add all inner content to div
    aboutDiv.innerHTML = `
        <div id='about'>
        <div class='scroll-box'>
            <p class='glance selected'>at a glance</p>
            <p class='education'>education</p>
            <p class='skills'>skills</p>
            <p class='other-side'>the other side</p>
            <div class='scroll-bar'></div>
            <div class='scroll-bar inner'></div>
        </div>
        <div class='content'>
            <div class='glance-content'>
                <h1>I believe well rounded <span>content</span> comes from well rounded <span>people</span>.</h1>
                <p>As a <span>developer</span>, I create content that is professional, but fun.  Engaging to the user, yet not demanding of them.  I am constantly searching for better ways to solve problems, and to add new tools to my belt.</p>
                <p>As a <span>human</span>, I am a dedicated worker, an early communicator, and an eager learner.  While working on a team, I always strive for humility; to find ways to maximize my own potential, and lift the potential of those around me.</p>
            </div>
            <div class='education-content'>
                <div class='flatiron-education'>
                    <div class='education-heading'>
                        <img src='./assets/flatiron-logo.jpg' alt='flatiron school logo'>
                        <h2><span>Flatiron School</span> - Software Engineering Immersive</h2>
                        <h3>Oct 2020 - Jan 2021</h3>
                    </div>
                    <div class='education-inner-content'>
                        <div>
                            <h3>Job ready in 15-weeks.</h3>
                            <p>Full-stack software engineering bootcamp.  We learned how to build back-to-front, using the fundamentals of MVC to create a full-stack Ruby on Rails application by <em>week 6</em>.  We built on top of this with Javascript frontend development, and integrating React with Redux for fast and dynamic user interfaces.</p>
                            <p>I learned how to build professional web applications, with considerations on security & authorization, user experience, rapid API queries, and time/memory optimization.</p>
                        </div>
                        <div>
                            <h4>Skills & Technologies learned</h4>
                            <ul>
                            
                            </ul>
                        </div>

                    </div>
                </div>
                <div class='wwu-education'>
                    <div class='education-heading'>
                        <img src='./assets/wwu-logo-2.svg' alt='western washington university logo'>
                        <h2><span>Western Washington University</span> - M.S. Exercise Science</h2>
                        <h3>Jan 2016 - Dec 2018</h3>
                    </div>
                    <div class='education-inner-content'>
                        <p>stuff</p>
                        <p>and</p>
                        <p>things</p>
                        <p>and</p>
                        <p>stuff</p>
                    </div>
                </div>
            </div>
            <div class='skills-content'></div>
            <div class='other-side-content'></div>
        </div>
    `
    main.appendChild(aboutDiv)
}

function dismountPage() {
    document.getElementById('about').remove()
}

function addPageEvents() {
    addScrollEvents()
    addEducationExpandEvent()
}

// ===============
//    ANIMATIONS
// ===============

export function aboutLoad() {
    // GRAB PAGE ELEMENTS
    const scrollBar = document.querySelector('.scroll-bar')
    const innerScrollBar = document.querySelector('.scroll-bar.inner')
    const scrollItems = document.querySelectorAll('.scroll-box > p')
    // ESTABLISH NEW TIMELINE
    const t1 = new TimelineMax()
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
function aboutHide() {
    // GRAB PAGE ELEMENTS
    const scrollBar = document.querySelector('.scroll-bar')
    const innerScrollBar = document.querySelector('.scroll-bar.inner')
    const scrollItems = document.querySelectorAll('.scroll-box > p')
    // ESTABLISH NEW TIMELINE
    const t1 = new TimelineMax({ onComplete: dismountPage })
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

    console.log(t1.totalDuration())
    return t1
}

function scrollToItemByIndex(i) {
    // grab inner scroll bar
    const innerScrollBar = document.querySelector('.scroll-bar.inner')
    // find desired position
    const position = `${75 - (25 * i)}%`
    // set timeline
    const t1 = new TimelineMax()
    // move scrollbar to desired position
    t1.to(innerScrollBar, 1.5, { bottom: position, ease: Power3.easeOut })
}

function scrollToPagePositionByClassName(className) {
    // set timeline
    const t1 = new TimelineMax()
    // scroll page to position
    t1.to(window, 1.5, { scrollTo: `.${className}-content`, ease: Power3.easeOut })
}

function expandEducationContent(content) {
    // get div height for animation
    const height = content.offsetHeight
    console.log('INITIALIZED EVENT FOR: ', content, 'WITH DIV HEIGHT: ', height)
    // set timeline
    const t1 = new TimelineMax({ paused: true, reversed: true })
    // expand div
    t1.fromTo(
        content, 0.5,
        { height: 0, autoAlpha: 0, display: 'none' }, 
        { height: height, autoAlpha: 1, display: 'flex' }
    )

    return t1
}

// ===============
//   PAGE EVENTS
// ===============

function addScrollEvents() {
    const scrollItems = document.querySelectorAll('#about > .scroll-box > p')
    // iterate each item and add event
    let n = 0
    for (const item of scrollItems) {
        let i = n
        item.addEventListener('click', e => {
            // short-circuit if already selected
            if (e.target.classList.contains('selected')) return
            // ELSE
            const className = e.target.className
            // remove selected from previous item
            document.querySelector('.scroll-box > p.selected').classList.remove('selected')
            // add selected to the new item
            e.target.classList.add('selected')
            // animate the scrollbar
            scrollToItemByIndex(i)
            // animate the page to correct position
            scrollToPagePositionByClassName(className)
        })
        n++
    }
}

function addEducationExpandEvent() {
    // get all education containers
    const educationContainers = document.querySelectorAll('.education-content > div')
    // for each container, assign conditional event to expand or collapse the div
    for (const container of educationContainers) {
        let [header, content] = container.children
        const animation = expandEducationContent(content)
        header.addEventListener('click', () => {
            if (container.classList.contains('selected')) {
                container.classList.remove('selected')
                animation.reverse()
            } else {
                container.classList.add('selected')
                animation.play()
            }
        })
    }
}