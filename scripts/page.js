import welcomeConstructor from './welcome.js';

export default function constructMainPageObject() {
    // MAIN PAGE OBJECT
    const page = {}
    
    // SUB-PAGE OBJECTS
    const welcome = welcomeConstructor()

    page.load = () => {
        // SET RELEVANT PAGE EVENTS
        addEventsToNavbar()
        // SET DEFAULT START STATE
        revealSectionByClassName('welcome-link')
    }

    // ==============
    // HELPER METHODS
    // ==============

    const hideCurrentSection = () => {
        const current = document.querySelector('a.selected')
        current.classList.remove('selected')
        // EXECUTE CORRECT HIDE ANIMATION FOR THE SELECTED TAG
        switch (current.className) {
            case 'welcome-link':
                // animate and dismount
                welcome.animations.hide() // fx ends with a call to dismount DOM element
                break

            case 'about-link':
                // insert functionality
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
            case 'welcome-link':
                // mount page and animate in
                welcome.construct()
                welcome.animations.load()
                break

            case 'about-link':
                // insert functionality
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

    const addEventsToNavbar = () => {
        const elements = document.querySelectorAll('.navbar > ul > li > a')
        for (const el of elements) {
            el.addEventListener('click', navigateEvent)
        }
    }

    const navigateEvent = e => {
        if (e.target.classList.contains('selected')) return
        // ELSE
        hideCurrentSection()
        // wait for animation to end before animating in new section
        setTimeout(() => revealSectionByClassName(e.target.className), 1000)
    }

    return page
}