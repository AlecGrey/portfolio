import { welcomeLoad, welcomeHide } from './animation/welcomePage.js'
import navbarLoadAnimation from './animation/navbarLoad.js';

navbarLoadAnimation()
setTimeout(welcomeLoad, 500)

const selectLinkTag = linkTag => {
    // removes selected from current and adds it to new linkTag
    document.querySelector('a.selected').classList.remove('selected')
    linkTag.classList.add('selected')
}


// HIDE THE PAGE
document.querySelector('h3.welcome-h3').addEventListener('click', welcomeHide)
document.querySelector('a.about-link').addEventListener('click', e => {
    if (e.target.classList.contains('selected')) return
    selectLinkTag(e.target)
    welcomeHide()
})
// LOAD THE PAGE
document.querySelector('a.welcome-link').addEventListener('click', e => {
    if (e.target.classList.contains('selected')) return
    selectLinkTag(e.target)
    welcomeLoad()
})
