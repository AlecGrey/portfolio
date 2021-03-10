import welcomeConstructor from './welcome.js';
import aboutConstructor from './about.js';
import projectsConstructor from './projects.js';
import contactConstructor from './contact.js';

export default function constructMainPageObject() {
    // CONSTRUCTS PAGE WITH SUBPAGES AND EVENT LISTENERS
    // MAIN PAGE OBJECT
    const page = {}
    // SUB-PAGE OBJECTS
    const welcome = welcomeConstructor()
    const about = aboutConstructor()
    const projects = projectsConstructor()
    const contact = contactConstructor()
    // ANIMATION HOLDER
    page.animations = {
        'welcomeLoad': null,
        'aboutLoad': null,
        'projectsLoad': null,
        'contactLoad': null
    }

    page.load = () => {
        // SET RELEVANT PAGE EVENTS
        addEventsToNavbar()
        // SET DEFAULT START STATE
        revealSectionByClassName('welcome-link')
    }

    // ==============
    // HELPER METHODS
    // ==============

    const navigateEvent = e => {
        const nav = e.target
        if (nav.classList.contains('selected')) return
        // CHECK TO SEE IF SPECIAL RULES APPLY
        if (nav.className === 'projects-link') {
            // QUICKER TRANSITION B/C OF ANIMATION DELAY
            hideCurrentSection()
            setTimeout(() => revealSectionByClassName(nav.className), 700)

        } else {
            // STANDARD SWITCH
            hideCurrentSection()
            // wait for animation to end before animating in new section
            setTimeout(() => revealSectionByClassName(e.target.className), 1000)
        }
    }

    const hideCurrentSection = () => {
        const current = document.querySelector('a.selected')
        current.classList.remove('selected')
        // EXECUTE CORRECT HIDE ANIMATION FOR THE SELECTED TAG
        switch (current.className) {
            case 'welcome-link':
                // animate and dismount
                page.animations.welcomeLoad.pause()
                welcome.animations.hide() // fx ends with a call to dismount DOM element
                break

            case 'about-link':
                // animate and dismount
                page.animations.aboutLoad.pause()
                about.animations.hide() // fx ends with a call to dismount DOM element
                break

            case 'projects-link':
                // animate and dismount
                page.animations.projectsLoad.pause()
                projects.animations.hide()
                break

            case 'contact-link':
                // insert functionality
                page.animations.contactLoad.pause()
                contact.animations.hide()
                break

            default:
                // hopefully we don't hit this...
                return
        }
    }

    const revealSectionByClassName = name => {
        // add selected to class
        document.querySelector(`.${name}`).classList.add('selected')
        // execute animation depending on className
        switch(name) {
            // begin animation and save in hash for pausing
            case 'welcome-link':
                // mount page and animate in
                welcome.construct()
                page.animations.welcomeLoad = welcome.animations.load()
                welcomeEventListeners()
                break

            case 'about-link':
                // mount page and animate in
                about.construct()
                page.animations.aboutLoad = about.animations.load()
                aboutEventListeners()
                break

            case 'projects-link':
                // mount page and animate in
                projects.construct()
                page.animations.projectsLoad = projects.animations.load()
                projectsEventListeners()
                break

            case 'contact-link':
                // mount page and animate in
                contact.construct()
                page.animations.contactLoad = contact.animations.load()
                contactEventListeners()
                break

            default:
                // hopefully we don't hit this...
                return
        }
    }

    // =================================
    //      ADDING EVENT LISTENERS
    // =================================

    // NAVBAR EVENTS
    const addEventsToNavbar = () => {
        const elements = document.querySelectorAll('.navbar > ul > li > a')
        for (const el of elements) {
            el.addEventListener('click', navigateEvent)
        }
    }

    // WELCOME PAGE-CHANGING EVENT
    const welcomeEventListeners = () => {
        const el = document.querySelector('.welcome-h3 > span')
        el.addEventListener('click', () => {
            hideCurrentSection()
            // wait for animation to end before animating in new section
            setTimeout(() => revealSectionByClassName('about-link'), 1000)
        })
    }

    const aboutEventListeners = () => {
        about.addPageEvents()
    }

    const projectsEventListeners = () => {
        projects.addPageEvents()
    }

    const contactEventListeners = () => {
        contact.addPageEvents()
    }

    return page
}