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
    aboutDiv.innerHTML = mainHTML
    main.appendChild(aboutDiv)
}

function dismountPage() {
    document.getElementById('about').remove()
}

function addPageEvents() {
    // event listeners
    addScrollEvents()
    addEducationExpandEvent()
    addSkillDetailEvents()
    // add animations
    orbitAllSkillIcons()
}

function addSkillDetails(section) {
    // grab container to inject
    const container = document.querySelector('div.skill-details')
    switch (section) {
        case 'backend':
            document.querySelector('.fa-database').classList.add('selected')
            container.innerHTML = backendSkillHTML
            break
        case 'frontend':
            document.querySelector('.fa-laptop-code').classList.add('selected')
            container.innerHTML = frontendSkillHTML
            break
        case 'general-coding':
            document.querySelector('.fa-code').classList.add('selected')
            container.innerHTML = generalCodingSkillHTML
            break
        case 'non-coding':
            document.querySelector('.fa-laugh-wink').classList.add('selected')
            container.innerHTML = nonCodingSkillHTML
            break
        default:
            break
    }
}

function removeSelectedFromSkillDetail() {
    document.querySelector('.skill-icons > i.selected').classList.remove('selected')
}

// ===============
//    ANIMATIONS
// ===============

// PAGE IN / OUT
function aboutLoad() {
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
    // animate in the first section
    glanceSectionIn()
    // return timeline
    return t1
}

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
    // animate out the current section
    hideCurrentSection()
    // return timeline
    return t1
}

// PAGE SCROLLING ANIMATIONS
function scrollToItemByIndex(i) {
    // grab inner scroll bar
    const innerScrollBar = document.querySelector('.scroll-bar.inner')
    // find desired position
    const position = `${75 - (25 * i)}%`
    // set timeline
    const t1 = new TimelineMax()
    // move scrollbar to desired position
    t1.to(innerScrollBar, 2, { bottom: position, ease: Power3.easeOut })
}

function scrollToPagePositionByClassName(className) {
    // set timeline
    const t1 = new TimelineMax()
    // scroll page to position
    t1.to(window, 1.5, { scrollTo: `.${className}-content`, ease: Power3.easeOut })
}

// ===== SUBSECTION ANIMATIONS ===== //
// == GLANCE == //
function glanceSectionIn() {
    const section = document.querySelector('.glance-content')
    const t1 = new TimelineMax()
    // reveal section
    t1.set(section, { visibility: 'visible' })
    // fade in section
    t1.fromTo(section, 1.5, {alpha: 0}, {alpha: 1, ease: Power1.easeOut})

    return t1
}

function glanceSectionOut() {
    const section = document.querySelector('.glance-content')
    const t1 = new TimelineMax()
    // fade out section
    t1.fromTo(section, 0.5, {alpha: 1}, {alpha: 0, ease: Power3.easeOut})
    t1.set(section, { visibility: 'hidden' })

    return t1
}

//  == EDUCATION == //
function educationSectionIn() {
    const section = document.querySelector('.education-content')
    // set timeline
    const t1 = new TimelineMax()
    // reveal section
    t1.set(section, { visibility: 'visible' })
    let i = 0
    for (const el of section.children) {
        t1.fromTo(
            el, 1.5 - (i * 0.3),
            { alpha: 0, xPercent: 100 },
            { alpha: 1, xPercent: 0, ease: Power3.easeOut },
            i * 0.3
        )
        i++
    }

    return t1
}

function educationSectionOut() {
    const section = document.querySelector('.education-content')
    // set timeline
    const t1 = new TimelineMax
    // animate out each tile
    let i = 1
    for (const el of section.children) {
        t1.fromTo(
            el, 0.8,
            { alpha: 1, xPercent: 0 },
            { alpha: 0, xPercent: 4 + (1 * i), ease: Power1.easeOut },
            0
        )
        i++
    }
    t1.set(section, { visibility: 'hidden' })

    return t1
}

function expandEducationContent(content) {
    // get div height for animation
    const height = content.offsetHeight
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

// == SKILLS == //
function skillsSectionIn() {
    const section = document.querySelector('.skills-content')
    const iconContainer = document.querySelector('.skill-icons')
    const t1 = new TimelineMax()
    // reveal section
    t1.set(section, { visibility: 'visible' })
    // fade in section
    t1.fromTo(section, 1.5, { alpha: 0 }, { alpha: 1, ease: Power1.easeOut })
    t1.fromTo(iconContainer, 1, { yPercent: 30 }, { yPercent: 0, ease: Power3.easeOut}, 0)

    return t1

}

function skillsSectionOut() {
    const section = document.querySelector('.skills-content')
    const iconContainer = document.querySelector('.skill-icons')
    const t1 = new TimelineMax()
    // animate out section
    t1.fromTo(section, 0.5, { alpha: 1 }, { alpha: 0, ease: Power3.easeOut })
    t1.fromTo(iconContainer, 0.5, { yPercent: 0 }, { yPercent: 30, ease: Power3.easeOut }, 0)
    // hide section
    t1.set(section, { visibility: 'hidden' })

    return t1
}

// function orbitElementAfterDelay(el, time) {
//     // set quarter-time for each animation
//     const qTime = time / 4
//     // set color ranges
//     const color = [
//         'rgb(200, 200, 200)',
//         'rgb(220, 220, 220)',
//         'rgb(240, 240, 240)'
//     ]
//     const bgColor = [
//         'rgb(30, 30, 30)',
//         'rgb(40, 40, 40)',
//         'rgb(50, 50, 50)'
//     ]

//     const t1 = new TimelineMax({ paused: true, repeat: -1 })
//     // set starting position
//     t1.set(el, { right: '100%', xPercent: 100 , bottom: '50%', yPercent: 50, z: 50, zIndex: 5, color: color[1], backgroundColor: bgColor[1] })
//     // set first quarter rotation
//     t1.to(el, qTime, { right: '50%', xPercent: 50, ease: Power1.easeIn }, 0)
//     t1.to(el, qTime, { bottom: '100%', yPercent: 100, z: 0, zIndex: 4, color: color[0], backgroundColor: bgColor[0], ease: Power1.easeOut }, 0)
//     // set second quarter rotation
//     t1.to(el, qTime, { right: '0%', xPercent: 0, ease: Power1.easeOut }, qTime)
//     t1.to(el, qTime, { bottom: '50%', yPercent: 50, z: 50, zIndex: 5, color: color[1], backgroundColor: bgColor[1],  ease: Power1.easeIn }, qTime)
//     // set third quarter rotation
//     t1.to(el, qTime, { right: '50%', xPercent: 50, ease: Power1.easeIn }, qTime * 2)
//     t1.to(el, qTime, { bottom: '0%', yPercent: 0,  z: 100, zIndex: 6, color: color[2], backgroundColor: bgColor[2], ease: Power1.easeOut }, qTime * 2)
//     // set fourth quarter rotation
//     t1.to(el, qTime, { right: '100%', xPercent: 100,  ease: Power1.easeOut }, qTime * 3)
//     t1.to(el, qTime, { bottom: '50%', yPercent: 50,  z: 50, zIndex: 5, color: color[1], backgroundColor: bgColor[1], ease: Power1.easeIn }, qTime * 3)
//     // start position based off index of element
//     t1.play()

//     return t1
// }

function newOrbitElement(el, time, i) {
    const qTime = time / 4
    // set color ranges
    const color = [
        'rgb(200, 200, 200)',
        'rgb(220, 220, 220)',
        'rgb(240, 240, 240)'
    ]
    const bgColor = [
        'rgb(30, 30, 30)',
        'rgb(40, 40, 40)',
        'rgb(50, 50, 50)'
    ]
    // SET TIMELINE WITH PARAMS
    const t1 = new TimelineMax({ paused: true, repeat: -1 })
    // first quarter animation
    t1.fromTo(el, qTime,
        { right: '100%', xPercent: 100 , bottom: '50%', yPercent: 50, z: 50, zIndex: 5, color: color[1], backgroundColor: bgColor[1] }, // FROM
        { right: '50%', xPercent: 50, ease: Power1.easeIn }, // TO
        0
    )
    t1.to(el, qTime, { bottom: '100%', yPercent: 100, z: 0, zIndex: 4, color: color[0], backgroundColor: bgColor[0], ease: Power1.easeOut }, 0)
    // second quarter animation
    t1.fromTo(el, qTime,
        { right: '50%', xPercent: 50, bottom: '100%', yPercent: 100, z: 0, zIndex: 4, color: color[0], backgroundColor: bgColor[0] }, // FROM
        { right: '0%', xPercent: 0, ease: Power1.easeOut }, // TO
        qTime
    )
    t1.to(el, qTime, { bottom: '50%', yPercent: 50, z: 50, zIndex: 5, color: color[1], backgroundColor: bgColor[1],  ease: Power1.easeIn }, qTime)
    // third quarter animation
    t1.fromTo(el, qTime,
        { right: '0%', xPercent: 0, bottom: '50%', yPercent: 50, z: 50, zIndex: 5, color: color[1], backgroundColor: bgColor[1] }, // FROM
        { right: '50%', xPercent: 50, ease: Power1.easeIn }, // TO
        qTime * 2
    )
    t1.to(el, qTime, { bottom: '0%', yPercent: 0,  z: 100, zIndex: 6, color: color[2], backgroundColor: bgColor[2], ease: Power1.easeOut }, qTime * 2)
    // fourth quarter animation
    t1.fromTo(el, qTime,
        { right: '50%', xPercent: 50, bottom: '0%', yPercent: 0,  z: 100, zIndex: 6, color: color[2], backgroundColor: bgColor[2] }, // FROM
        { right: '100%', xPercent: 100 }, // TO
        qTime * 3
    )
    t1.to(el, qTime, { bottom: '50%', yPercent: 50,  z: 50, zIndex: 5, color: color[1], backgroundColor: bgColor[1], ease: Power1.easeIn }, qTime * 3)
    // PLAY TIMELINE FROM DELAY POINT
    t1.play( i * qTime )
    // return timeline
    return t1
}

function orbitAllSkillIcons() {
    const icons = document.querySelectorAll('.skill-icons > i')
    // set animation for each element
    // set total animation duration
    const duration = 25
    // track index to pass into animation fx
    let i = 0
    for (const el of icons) {
        // set animation to start with element, given duration, and time delay
        newOrbitElement(el, duration, i)
        // increment time delay
        i++
    }
}

function skillDetailIn() {
    // grab content
    const content = document.querySelector('.skill-details')
    // set new timeline
    const t1 = new TimelineMax()
    // alpha/fade in with rise
    t1.fromTo(
        content, 0.3,
        { alpha: 0, yPercent: 3 },
        { alpha: 1, yPercent: 0 }
    )
    // return timeline
    return t1
}

function skillDetailOut() {
    // grab content
    const content = document.querySelector('.skill-details')
    // set new timeline
    const t1 = new TimelineMax()
    // alpha/fade in with rise
    t1.fromTo(
        content, 0.3,
        { alpha: 1, yPercent: 0 },
        { alpha: 0, yPercent: 3 }
    )
    // return timeline
    return t1
}

// == OTHER-SIDE == //
function otherSideSectionIn() {
    // grab section
    const section = document.querySelector('.other-side-content')
    const img = document.getElementById('other-side-img')
    const pElements = document.querySelectorAll('.other-side-content > p')
    // start new timeline
    const t1 = new TimelineMax()
    // make section visible
    t1.set(section, { visibility: 'visible' })
    // translate in background image
    t1.fromTo(img, 1, { alpha: 0, xPercent: -1 }, { alpha: 1, xPercent: 0 }, 0)
    // fade in page content with 0.5s offset
    let i = 0
    for (const el of pElements) {
        t1.fromTo(el, 0.8, { alpha: 0, xPercent: 10 }, { alpha: 1, xPercent: 0 }, i * 0.2)
        i++
    }
    // return timeline
    return t1
}

function otherSideSectionOut() {
    // grab section
    const section = document.querySelector('.other-side-content')
    const img = document.getElementById('other-side-img')
    const pElements = document.querySelectorAll('.other-side-content > p')
    // start new timeline
    const t1 = new TimelineMax()
    // translate image
    t1.to(img, 0.5, { xPercent: -1, alpha: 0 }, 0)
    // translate out each p element
    for (const el of pElements) {
        t1.to (el, 0.5, { xPercent: 10, alpha: 0 }, 0)
    }
    // end by hiding section
    t1.set(section, { visibility: 'hidden' })
    // return timeline
    return t1
}

// ===============
//   PAGE EVENTS
// ===============

function addScrollEvents() {
    const scrollItems = document.querySelectorAll('.scroll-box > p')
    // iterate each item and add event
    let n = 0
    for (const item of scrollItems) {
        let i = n
        item.addEventListener('click', e => {
            // short-circuit if already selected
            if (e.target.classList.contains('selected')) return
            // ELSE
            const className = e.target.className
            // find previously selected section
            const prev = document.querySelector('.scroll-box > p.selected')
            prev.classList.remove('selected')
            // animate out previous section
            animateSectionOut(prev.className)
            // add selected to the new item
            e.target.classList.add('selected')
            // animate the scrollbar
            scrollToItemByIndex(i)
            // animate the page to correct position
            scrollToPagePositionByClassName(className)
            // animate in the subsection
            setTimeout(() => animateSectionIn(className), 500)
        })
        n++
    }
}

function animateSectionIn(section) {
    // execute animation depending on the passed in section
    switch (section) {
        case 'glance':
            glanceSectionIn()
            break
        case 'education':
            educationSectionIn()
            break
        case 'skills':
            skillsSectionIn()
            break
        case 'other-side':
            otherSideSectionIn()
            break
    }
}

function animateSectionOut(section) {
    // execute animation depending on the passed in section
    switch (section) {
        case 'glance':
            glanceSectionOut()
            break
        case 'education':
            educationSectionOut()
            break
        case 'skills':
            skillsSectionOut()
            break
        case 'other-side':
            otherSideSectionOut()
            break
    }
}

function hideCurrentSection() {
    const section = document.querySelector('.scroll-box > p.selected')
    section.classList.remove('selected')
    animateSectionOut(section.className)
}

function addEducationExpandEvent() {
    // get all education containers
    const educationContainers = document.querySelectorAll('.education-content > div')
    // hash to capture all animations for referencing
    const animations = {}
    // for each container, assign conditional event to expand or collapse the div
    for (const container of educationContainers) {
        let [header, content] = container.children
        const animation = expandEducationContent(content)
        // save animation to hash
        animations[container.className] = animation
        // add event listener
        header.addEventListener('click', () => {
            if (container.classList.contains('selected')) {
                // remove selected class and collapse
                container.classList.remove('selected')
                animation.reverse(0.5)
            } else {
                // collapse currently selected div and remove selected class
                let prev = document.querySelector('.education-content > div.selected')
                if (prev !== null) {
                    prev.classList.remove('selected')
                    animations[prev.className].reverse(0.5)
                    setTimeout(() => animation.play(0), 500) // short delay to smooth the animation
                } else {
                    animation.play(0)
                }
                container.classList.add('selected')
            }
        })
    }

    function collapseEducationOnScroll(e) {
        const el = e.target
        // short circuit event if still on current section
        if (el.tagName !== 'P' || el.classList.contains('education')) return
        // ELSE find the current selected
        const current = document.querySelector('.education-content > .selected')
        // if there is a selected box...
        if (!!current) {
            // remove selected from classname
            current.classList.remove('selected')
            // use classname to determine which animation to run
            setTimeout(() => animations[current.className].reverse(0.5), 800)
        }
    }

    document.querySelector('div.scroll-box').addEventListener('click', collapseEducationOnScroll)
}

function addSkillDetailEvents() {
    const icons = document.querySelectorAll('.skill-icons > i')
    // set each section to switch to
    const sections = ['frontend', 'backend', 'general-coding', 'non-coding']
    let i = 0
    for (const icon of icons) {
        let section = sections[i]
        icon.addEventListener('click', e => changeToSkillSection(e, section))
        i++
    }
}

function changeToSkillSection(e, section) {
    // short circuit if currently selected!
    if (e.target.classList.contains('selected')) return
    // decide whether to immediately animate in, or wait until previous is animated out:
    if (document.querySelector('.skill-icons > i.selected') === null) {
        // inject HTML to page
        addSkillDetails(section)
        // animate section in
        skillDetailIn()
    } else {
        // animate out previous
        skillDetailOut()
        removeSelectedFromSkillDetail()
        // animate in the new section
        setTimeout(() => {
            addSkillDetails(section)
            skillDetailIn()
        }, 300)
    }
}

// ====================================
//        PAGE HTML INJECTIONS
// ====================================
const mainHTML = `
<div class='scroll-container'>
    <div class='scroll-box'>
        <p class='glance selected'>at a glance</p>
        <p class='education'>education</p>
        <p class='skills'>skills</p>
        <p class='other-side'>the other side</p>
        <div class='scroll-bar'></div>
        <div class='scroll-bar inner'></div>
    </div>
</div>

<div class='content'>
    <div class='glance-content'>
        <h1>I believe well rounded <span>content</span> comes from well rounded <span>people</span>.</h1>
        <p>As a <span>developer</span>, I want my content to be professional, but fun.  Engaging to the user, yet not demanding of them.  I am constantly searching for better ways to solve problems, and to add new tools to my belt.</p>
        <p>As a <span>human</span>, I am a dedicated worker, an early communicator, and an eager learner.  While working on a team, I put humility first; I look for ways to maximize my own potential, and I work hard to help lift those around me.</p>
        <p>Wanna cut to the chase?  Download my resume <a id='resume-link' href='./assets/20210215-Alexander-Grey.pdf' target='_blank'>here</a>.</p>
    </div>
    <div class='education-content'>
        <div class='flatiron-education'>
            <div class='education-heading'>
                <img src='./assets/flatiron-logo.jpg' alt='flatiron school logo'>
                <h2><span>Flatiron School</span> - Software Engineering Immersive</h2>
                <h3>Oct 2020 - Jan 2021</h3>
            </div>
            <div class='education-inner-content'>
                <div class='summary'>
                    <h3>Job ready in 15-weeks.</h3>
                    <p>Full-stack software engineering bootcamp.  We learned how to build back-to-front, using the fundamentals of MVC to create a full-stack Ruby on Rails application by <em>week 6</em>.  We built on top of this with Javascript frontend development, and integrating React with Redux for fast and dynamic user interfaces.</p>
                    <p>I learned how to build professional web applications, with considerations on security & authorization, user experience, rapid API queries, and time/memory optimization.</p>
                </div>
                <div class='details'>
                    <div class='languages'>
                        <h4>Languages</h4>
                        <ul>
                            <li>Ruby</li>
                            <li>Javascript</li>
                            <li>HTML, CSS</li>
                            <li>SQL</li>
                        </ul>
                    </div>
                    <div class='technologies'>
                        <h4>Technologies</h4>
                        <ul>
                            <li>Rails</li>
                            <li>React</li>
                            <li>Redux</li>
                            <li>PostgreSQL*</li>
                            <li>Bootstrap*</li>
                            <li>Websockets*</li>
                            <li>Heroku & Firebase*</li>
                        </ul>
                    </div>
                    <div class='skills'>
                        <h4>Skills</h4>
                        <ul>
                            <li>OO Programming</li>
                            <li>RESTful API</li>
                            <li>Auth & web tokens</li>
                            <li>Data structures</li>
                            <li>Git/version control</li>
                            <li>Web Scraping*</li>
                            <li>Deployment*</li>
                        </ul>
                    </div>
                </div>
                <p class='footnote'><em>* self taught during program</em></p>
            </div>
        </div>
        <div class='wwu-education'>
            <div class='education-heading'>
                <img src='./assets/wwu-logo-2.svg' alt='western washington university logo'>
                <h2><span>Western Washington University</span> - M.S. Exercise Science</h2>
                <h3>Jan 2016 - Dec 2018</h3>
            </div>
            <div class='education-inner-content'>
                <div class='summary'>
                    <h3>Data first.</h3>
                    <p>Advanced research degree covering the most recent topics and ideologies of human performance, injury prevention, and physical health.  Partook in several research projects in WWU's state-of-the-art biomechanics lab, including a cumulative solo research project.</p>
                    <p>Performed data capture using an integrated Vicon capture system, with a 3D capture, force measurements, and separate tools for metabolic testing.  Learned statistical analysis using SPSS and excel.</p>
                    <h4>You can access my Master's Thesis <a href='https://cedar.wwu.edu/cgi/viewcontent.cgi?article=1803&context=wwuet' target="_blank">here</a></h4>
                </div>
            </div>
        </div>
    </div>
    <div class='skills-content'>
        <div class='skill-details'></div>
        <div class='skill-icons'>
            <i class="fas fa-laptop-code"></i>
            <i class="fas fa-database"></i>
            <i class="fas fa-code"></i>
            <i class="far fa-laugh-wink"></i>
        </div>
    </div>
    <div class='other-side-content'>
        <div id='other-side-img'></div>
        <p>I'm <span>28 years young</span> and a home-grown member of the <span>Pacific Northwest</span>.  Any good weekend you can catch me and my wife out <span>exploring the parks</span> or up in Bellingham visiting our Alma Mater.  I'm a competitive <span>Ultimate Frisbee</span> player, a decent <span>cook</span>, and a tough (but fair) <span>dungeon master</span>.</p>
        <p>Same with work as I am in my life: I love to try new things, and I like to get really good at them too.</p>
    </div>
`

const backendSkillHTML = `
<h1>Backend Development</h1>
<div>
    <div class='icon-container'>
        <i class="fas fa-gem"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Ruby on Rails</h2>
        <p>
            Develop sophisticated backend APIs using <span>REST</span>ful conventions and data validations.  Relational database modeling, rapid API rquests via <span>JSON-API serializer</span>. Built and deployed APIs with <span>PostgreSQL</span> databases.  Websockets protocol via <span>ActionCable</span> gem.
        </p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fab fa-python"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Python & Flask</h2>
        <p>
            Develop rapid, light-weight APIs using <span>Flask micro-framework</span>.  Built database models and validations via <span>SQLAlchemy</span>.  Data serialization via <span>Marshmallow</span>.  Migrate databases and control versions using <span>Alembic</span>.
        </p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fas fa-user-lock"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Security, Authentication and Authorization</h2>
        <p>
            Password encryption and validation via <span>BCrypt</span> in Rails.  Authorization using <span>JSON Web Tokens</span>.  Request handling via <span>CORS</span>.
        </p>
    </div>
</div>
`

const frontendSkillHTML = `
<h1>Frontend Development</h1>
<div>
    <div class='icon-container'>
        <i class="fab fa-react"></i>    
    </div>
    <div class='skill-inner-content'>
        <h2>React & Redux</h2>
        <p>Build rapid, interactive web applications. Integrate multiple endpoints via <span>react-router</span>.  Incorporate complex state-management with <span>Redux</span> store.  Build functional components utilizing hooks for local state management and component timelines. Maintain sessions via cookies and localStorage.  Create real-time user experiences with <span>websockets</span>.</p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fab fa-bootstrap"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Bootstrap</h2>
        <p>Build modern, flexible user-interfaces.  Incorporate <span>Bootstrap 4</span> class designations for flexbox and grid layouts, as well as text and HTML element styling.  Integrate <span>React-Bootstrap</span> components in client-side applications.</p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fas fa-desktop"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Static Content</h2>
        <p>Create highly functional static webpages using <span>HTML</span> and <span>CSS</span>.  <span>Embedded Ruby (.erb)</span> view files in Ruby on Rails, and <span>Jinja2</span> for Python/Flask applications.</p>
    </div>
</div>
`

const generalCodingSkillHTML = `
<h1>General Development</h1>
<div>
    <div class='icon-container'>
        <i class="fas fa-cube"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Object Oriented Programming</h2>
        <p>Build applications using <span>DRY</span> code using object-oriented design.  Implemented fundamentals in multiple <span>Ruby</span> and <span>Javascript</span> applications.</p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fas fa-code-branch"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Version Control</h2>
        <p>Safely manage code updates and features using .git version control via <span>GitHub</span>.  Collaborate with multiple team members on larger projects, coordinating feature changes and merging conflicting changes.  Access my github <a href='https://github.com/AlecGrey'>here.</a></p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fas fa-file-code"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>API Queries & Web Scraping</h2>
        <p>Incorporate data from 3rd-party APIs into applications.  In the absence of a serviceable API, successfully implemented <span>chromedriver</span> and <span>watir</span> to develop web scraping script to attain pertinent site data.</p>
    </div>
</div>
`

const nonCodingSkillHTML = `
<h1>Non Technical</h1>
<div>
    <div class='icon-container'>
        <i class="fas fa-users"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Teamwork</h2>
        <p>Collaborated on multiple team projects.  Maintain open lines of communication, coordinate workflow with team members, and manage code repositories to complete projects efficently.</p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fas fa-handshake"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Communications</h2>
        <p>Extensive experience with company-client communications, and being the face of an organization.  Maintain professional and warm communications with clients, prioritizing their needs and handling conflict amicably.</p>
    </div>
</div>
<div>
    <div class='icon-container'>
        <i class="fas fa-lightbulb"></i>
    </div>
    <div class='skill-inner-content'>
        <h2>Problem Solving</h2>
        <p>I am an adept and tenacious <span>problem solver</span>.  Can quickly pick up new technologies and find best uses in applications.  I have a strong <span>work ethic</span>, and am willing to put in the extra effort to deliver on big projects.</p>
    </div>
</div>
`