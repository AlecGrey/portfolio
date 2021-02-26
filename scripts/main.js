import { welcomeLoad, welcomeHide } from './animation/welcomePage.js'
import { aboutLoad, aboutHide, scrollToItemByIndex } from './animation/aboutPage.js'
import navbarLoad from './animation/navbarLoad.js';

// ================================================================
//                    GRAB NECESSARY PAGE TAGS
// ================================================================

// nav tags
const navWelcome = document.querySelector('a.welcome-link')
const navAbout = document.querySelector('a.about-link')
const navProjects = document.querySelector('a.projects-link')
const navContact = document.querySelector('a.contact-link')
// welcome tags
const welcomeToAboutTag = document.querySelector('h3.welcome-h3 > span')
// about tags
const atAGlance = document.querySelector('p.glance')
const education = document.querySelector('p.education')
const skills = document.querySelector('p.skills')
const otherSide = document.querySelector('p.other-side')

// array of all links
const navLinks = [navWelcome, navAbout, navProjects, navContact]
// array of all about page scroll items
const aboutScrollItems = [atAGlance, education, skills, otherSide]
// ALL PAGE ANIMATIONS
const animations = {}

// ================================================================
//                        PAGE FUNCTIONS
// ================================================================

// ALL PAGE FUNCTIONS
const pageLoad = () => {
    navbarLoad()
    setTimeout(() => playAnimation('welcomeLoad'), 500)
}

const hideCurrentSection = () => {
    const current = document.querySelector('a.selected')
    current.classList.remove('selected')
    // EXECUTE CORRECT HIDE ANIMATION FOR THE SELECTED TAG
    switch (current.className) {
        case 'welcome-link':
            animations['welcomeLoad'].pause()
            playAnimation('welcomeHide')
            break

        case 'about-link':
            animations['aboutLoad'].pause()
            playAnimation('aboutHide')
            break

            case 'projects-link':
            // insert animation
            break

            case 'contact-link':
            // insert animation
            break

        default:
            // hopefully we don't hit this...
            return
    }
}

const revealSectionByTagName = name => {
    // execute animation depending on className
    switch(name) {
        case 'welcome-link':
            playAnimation('welcomeLoad')
            break

        case 'about-link':
            playAnimation('aboutLoad')
            break

            case 'projects-link':
            // insert animation
            break

            case 'contact-link':
            // insert animation
            break

        default:
            // hopefully we don't hit this...
            return
    }
}

const switchPageOnNavClick = e => {
    // DO NOTHING IF WE CLICK THE CURRENTLY SELECTED LINK!
    if (e.target.classList.contains('selected')) return
    // begin animation to hide current page
    hideCurrentSection()
    // grab className of selected page
    const name = e.target.className
    // add selected to classList
    e.target.classList.add('selected')
    // after hide animation ends, reveal new page by name
    setTimeout(() => revealSectionByTagName(name), 1000)
}

const playAnimation = animationName => {
    if (animations[animationName]) animations[animationName].play(0)
    else {
        let fx = eval(animationName)()
        animations[animationName] = fx
    }
}

const setNavLinkEvents = () => {
    for (const link of navLinks) {
        link.addEventListener('click', switchPageOnNavClick)
    }
}

// WELCOME PAGE FUNCTIONS
const switchToAboutPage = () => {
    hideCurrentSection()
    setTimeout(() => revealSectionByTag(navAbout), 1000)
}

// ABOUT PAGE FUNCTIONS
const deselectCurrentItem = () => {
    document.querySelector('.scroll-box > p.selected').classList.remove('selected')
}

const setScrollItemEvents = () => {
    let n = 0
    for (const item of aboutScrollItems) {
        let i = n
        item.addEventListener('click', e => {
            if (e.target.classList.contains('selected')) return
            deselectCurrentItem()
            e.target.classList.add('selected')
            scrollToItemByIndex(i)
        })
        n += 1
    }
}

// ================================================================
//                    EVENT LISTENERS FOR PAGE
// ================================================================

// NAV EVENTS
setNavLinkEvents()
// WELCOME PAGE EVENTS
welcomeToAboutTag.addEventListener('click', switchToAboutPage)
// ABOUT PAGE EVENTS
setScrollItemEvents()
// LOAD IN THE PAGE
pageLoad()