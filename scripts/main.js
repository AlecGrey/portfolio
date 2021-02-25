import { welcomeLoad, welcomeHide } from './animation/welcomePage.js'
import { aboutLoad, aboutHide } from './animation/aboutPage.js'
import navbarLoad from './animation/navbarLoad.js';

// ================================================================
//                    GRAB NECESSARY PAGE TAGS
// ================================================================

const navWelcome = document.querySelector('a.welcome-link')
const navAbout = document.querySelector('a.about-link')
const navProjects = document.querySelector('a.projects-link')
const navContact = document.querySelector('a.contact-link')
const welcomeToAboutTag = document.querySelector('h3.welcome-h3 > span')
// array of all links
const navLinks = [navWelcome, navAbout, navProjects, navContact]
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

const revealSectionByTag = tag => {
    // if it is already selected, no action required
    if (tag.classList.contains('selected')) return
    // grab current tag's class
    const name = tag.className
    // add selected to classList
    tag.classList.add('selected')
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
    hideCurrentSection()
    setTimeout(() => revealSectionByTag(e.target), 1000)
}

const playAnimation = animationName => {
    if (animations[animationName]) animations[animationName].play(0)
    else {
        let fx = eval(animationName)()
        animations[animationName] = fx
    }
}

// WELCOME PAGE FUNCTIONS
const switchToAboutPage = () => {
    hideCurrentSection()
    setTimeout(() => revealSectionByTag(navAbout), 1000)
}

// ================================================================
//                    EVENT LISTENERS FOR PAGE
// ================================================================

// NAV EVENTS
for (const link of navLinks) {
    link.addEventListener('click', switchPageOnNavClick)
}
// WELCOME PAGE EVENTS
welcomeToAboutTag.addEventListener('click', switchToAboutPage)

// LOAD IN THE PAGE
pageLoad()