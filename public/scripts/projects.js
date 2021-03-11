export default function projectsConstructor() {
    const page = {}

    // construction
    page.construct = addPageContent
    page.dismount = dismountPage

    // animation
    page.animations = {
        load: projectsLoad,
        hide: projectsHide
    }

    // add event listeners
    page.addPageEvents = addPageEvents

    return page
}

// =============================
//       ADD / REMOVE HTML
// =============================

function addPageContent() {
    // grab main div
    const main = document.getElementById('main')
    // create section container
    const projectsDiv = document.createElement('div')
    projectsDiv.id = 'projects'
    // add content to main
    projectsDiv.innerHTML = mainHTML
    main.appendChild(projectsDiv)
    // add initial project cards to deck
    addCardsByRange(0, 3)
}

function dismountPage() {
    document.getElementById('projects').remove()
}

function addPageEvents() {
    // add all events / constant animations
    addInitialCardSelectEvents()
}

// ====================
//    HELPER METHODS
// ====================

function addCardsByRange(i, n) {
    // grab deck
    const deck = document.querySelector('.card-deck')
    // loop through the range
    for (i; i <= n; i++) {
        // create and append card at that index
        deck.appendChild(makeProjectCard(projects[i], i))
    }
}

function makeProjectCard(project, index) {
    // create card div
    const div = document.createElement('div')
    div.classList.add('card')
    div.dataset.index = index
    // create card content
    // name header
    const name = document.createElement('h2')
    name.textContent = project.name
    // image
    const img = document.createElement('img')
    img.src = project.image
    img.alt = `${project.name} image`
    // append content to div
    div.append(name, img)
    // return the new card
    return div
}

function setProjectContent(index) {
    // find the correct project
    const project = projects[index]
    // grab the container divs
    const header = document.querySelector('.project-details > .header')
    const links = document.querySelector('.project-details > .header > .links')
    const content = document.querySelector('.project-details > .content')
    // CHANGE TITLE AND IMAGE
    header.querySelector('h1').textContent = project.name
    header.querySelector('img').src = project.image
    // DELETE CONTENT
    content.innerHTML = ''
    links.innerHTML = ''
    // ADD CONTENT SECTION
    content.innerHTML = project.content
    // ADD REPO LINK
    const repo = document.createElement ('a')
    repo.textContent = 'Github'
    repo.href = project.repo
    repo.target = '_blank'
    links.appendChild(repo)
    // CONDITIONALLY ADD WEBSITE LINK
    if (!!project.url) {
        const website = document.createElement('a')
        website.textContent = 'Website'
        website.href = project.url
        website.target = '_blank'
        links.appendChild(website)
    }
    // CONDITIONALLY ADD DEMO LINK
    if (!!project.demo) {
        const demo = document.createElement('a')
        demo.textContent = 'Demo'
        demo.href = project.demo
        demo.target = '_blank'
        links.appendChild(demo)
    }
}

function deselectCurrentCard() {
    document.querySelector('.card-deck > .selected').classList.remove('selected')
}

function addSelectedToCard(card) {
    card.classList.add('selected')
}

// ====================
//      ANIMATIONS
// ====================

// PAGE IN / OUT
function projectsLoad() {
    // LOADS IN ALL PAGE ELEMENTS
    const cards = document.querySelectorAll('.card-deck > .card')
    // create new timeline
    const t1 = new TimelineMax()
    // hide cards below view
    t1.set(cards, { yPercent: 140 })
    // reveal cards
    t1.set( cards, { visibility: 'visible' }, 0.3)
    // for each card in the deck, bounce them up
    let i = 0
    for (const card of cards) {
        t1.to(card, 3, { yPercent: 40, ease: Elastic.easeOut }, (i * 0.1) + 0.3)
        i++
    }
    // return timeline
    return t1
}

function projectsHide() {
    // HIDES ALL PAGE ELEMENTS IN 1 SECOND
    const cards = document.querySelectorAll('.card-deck > .card')
    const content = document.querySelector('.project-details')
    // create new timeline
    const t1 = new TimelineMax({ onComplete: dismountPage })
    // fade out content
    t1.to(content, 1, { opacity: 0, ease: Power4.easeOut})
    // scroll them down and fade them out
    let i = 0
    for (const card of cards) {
        // translate down cards
        t1.fromTo(card, 0.5, { yPercent: 40 }, { yPercent: 140 }, i * 0.1)
        // hard code the matrix to HOPEFULLY fix the bug with changing matrix value
        i++
    }
    t1.set(cards, { visibility: 'hidden' })
    // return timeline
    return t1
}

function hideProjectContent() {
    // grab content
    const content = document.querySelector('.project-details')
    // set new timeline
    const t1 = new TimelineMax()
    // fade out and drop content
    t1.to(content, 0.6, { opacity: 0, yPercent: 10, ease: Power1.easeOut })
    // return timeline
    return t1
}

function revealProjectContent() {
    // grab content
    const content = document.querySelector('.project-details')
    // set new timeline
    const t1 = new TimelineMax()
    // fade in and raise content
    t1.fromTo(content, 0.7, { opacity: 0, yPercent: 10 }, { opacity: 1, yPercent: 0, ease: Power1.easeOut })
    // return timeline
    return t1
}

// ====================
//        EVENTS
// ====================

function addInitialCardSelectEvents() {
    // grab all current cards on page
    const cards = document.querySelectorAll('.card-deck > .card')
    for (const card of cards) {
        card.addEventListener('click', () => cardSelectEvent(card))
    }
    console.log('events added!')
}

function cardSelectEvent(card) {
    // short circuit if card is already selected
    if (card.classList.contains('selected')) return
    // if no card is currently selected...
    if (document.querySelector('.card-deck > .selected') === null) {
        // immediately append and reveal
        addSelectedToCard(card)
        setProjectContent(parseInt(card.dataset.index))
        revealProjectContent()
    } else {
        // if a card IS currently selected, we need to animate out and swap HTML first!
        // remove selected from card
        deselectCurrentCard()
        // add selected to new card
        addSelectedToCard(card)
        // animate out content
        hideProjectContent()
        // once old content fades out, replace content
        setTimeout(() => setProjectContent(parseInt(card.dataset.index)), 600)
        // fade in new content
        setTimeout(() => revealProjectContent(), 700)
    }
}

// ====================
//      PAGE HTML
// ====================

const mainHTML = `
<div class='project-details'>
    <div class='header'>
        <h1></h1>
        <img>
        <div class='links'></div>
    </div>
    <div class='content'></div>
</div>
<div class='card-deck-container'>
    <!-- <i class="fas fa-arrow-alt-circle-left"></i> -->
    <div class='card-deck'></div>
    <!-- <i class="fas fa-arrow-alt-circle-right"></i> -->
</div>
`

// ====================
//      PROJECTS
// ====================

const projects = [
    {
        name: 'Quick Trainer',
        image: './assets/projects/quick-trainer.png',
        repo: 'https://github.com/AlecGrey/quick-trainer-frontend',
        url: 'https://quick-trainer.firebaseapp.com/',
        content: `
        <p>
            Quick Trainer is a fitness platform that allows clients to seek out trainers, and for trainers to manage training agreements, set up new workouts, and communicate with their clients.  As a client you can request new training agreements, view workouts, export your workouts via PDF, rate/review workouts, and communicate with your trainer.  As a fitness professional, you can accept/reject agreements, create new workouts for your clients, receive and review feedback, and communicate with your client.
        </p>
        <p>This application was deployed using <span>firebase</span> and <span>heroku</span>.</p>
        <h2>Technologies</h2>
        <div class='technologies-lists'>
            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>React-Router</li>
                <li>React-to-PDF</li>
                <li>Bootstrap 4</li>
                <li>React-Bootstrap</li>
            </ul>
            <ul>
                <li>Ruby on Rails</li>
                <li>PostgreSQL</li>
                <li>JSON-API Serializer</li>
                <li>BCrypt</li>
                <li>Rack-Cors</li>
                <li>Websockets via ActionCable</li>
                <li>Redis</li>
            </ul>
        </div>
        `
    }, {
        name: 'Apartment Findr',
        image: './assets/projects/apartment-findr.png',
        repo: 'https://github.com/AlecGrey/apartment-findr',
        url: 'https://apartment-findr.herokuapp.com/',
        content: `
        <p>
            Apartment Findr is an application built to simplify the apartment-seeking process by creating a single-page user interface to browse apartments within similar price-ranges and neighborhoods.  The 3x3 grid format allows users to compare apartments similar price-points, and across multiple neighborhoods within these price points.  Each intersection of price and neighborhood contains all the listings that fit those parameters, so you can browse many listings in real time!
        </p>
        <p>All data was 'scraped' from Craigslist-SF, as Craigslist offers no API to fetch information.</p>
        <h2>Technologies</h2>
        <div class='technologies-lists'>
            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>React-Router</li>
                <li>Bootstrap 4</li>
                <li>React-Bootstrap</li>
            </ul>
            <ul>
                <li>Ruby on Rails</li>
                <li>PostgreSQL</li>
                <li>JSON-API Serializer</li>
                <li>Rack-Cors</li>
                <li>ChromeDriver via Watir</li>
            </ul>
        </div>
        `
    }, {
        name: 'Wacky Item Find',
        image: './assets/projects/wacky-item-find.png',
        repo: 'https://github.com/AlecGrey/wacky-item-find-frontend',
        demo: 'https://www.youtube.com/watch?v=tLrnKS0Hfr8',
        content: `
        <p>
            Wacky Item Find is an online shopping game, and a single-page application.  Users take advantage of the built-in search functionality given to them in order to find as many items from our shopping site as possible, and add them to their 'cart'.  The users are simply given the item's image, and they can search via category or item name to narrow down their choices to the correct one.  Compare your scores against the high scores and see how good you can do!  All items shown are pulled from the Etsy API.
        </p>
        <h2>Technologies</h2>
        <div class='technologies-lists'>
            <ul>
                <li>Vanilla Javascript</li>
                <li>HTML & CSS</li>
                <li>Bootstrap 4</li>
            </ul>
            <ul>
                <li>Ruby on Rails</li>
            </ul>
        </div>
        `

    }, {
        name: 'Listify',
        image: './assets/projects/listify.png',
        repo: 'https://github.com/AlecGrey/listify',
        demo: 'https://www.youtube.com/watch?v=dEenBGEsh8A',
        content: `
        <p>
            My first full-stack application!  Listify helps simplify your grocery-shopping experience, by allowing you to generate your list based off of the meals that you plan on cooking.  Simply add a meal from the catalog to your grocery list, and the ingredients and quantities will be added.  Any duplicates are automatically amalgamated in the list, giving you a simple list to follow.
        </p>
        <h2>Technologies</h2>
        <div class='technologies-lists'>
            <ul>
                <li>Ruby on Rails</li>
                <li>Bcrypt</li>
            </ul>
            <ul>
                <li>Embedded Ruby Views</li>
                <li>HTML & CSS</li>
            </ul>
        </div>
        `
    }
]