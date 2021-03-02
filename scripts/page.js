import welcomeConstructor from './welcome.js';
import aboutConstructor from './about.js';

export default function constructMainPageObject() {
    // CONSTRUCTS PAGE WITH SUBPAGES AND EVENT LISTENERS
    // MAIN PAGE OBJECT
    const page = {}
    // SUB-PAGE OBJECTS
    const welcome = welcomeConstructor()
    const about = aboutConstructor()
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
        if (e.target.classList.contains('selected')) return
        // ELSE
        hideCurrentSection()
        // wait for animation to end before animating in new section
        setTimeout(() => revealSectionByClassName(e.target.className), 1000)
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
                    // insert functionality
                break

                case 'contact-link':
                    // insert functionality
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
                // insert functionality
                break

            case 'contact-link':
                // insert functionality
                break

            default:
                // hopefully we don't hit this...
                return
        }
    }

    // =================================
    //   ADDING EVENT LISTENERS
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

    return page
}