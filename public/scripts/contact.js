export default function contactConstructor() {
    const page = {}
    // construction methods
    page.construct = addPageContent
    page.dismount = dismountPage
    // animations
    page.animations = {
        load: contactLoad,
        hide: contactHide
    }
    // add page event listeners
    page.addPageEvents = addPageEvents
    // return the page
    return page
}

// =============================
//       ADD / REMOVE HTML
// =============================

function addPageContent() {
    const main = document.getElementById('main')
    // create section container
    const contactDiv = document.createElement('div')
    contactDiv.id = 'contact'
    // add content to div
    contactDiv.innerHTML = mainHTML
    // append div to main
    main.appendChild(contactDiv)
}

function dismountPage() {
    document.getElementById('contact').remove()
}

function addPageEvents() {
    // add page events and running animations
    addFormSubmitEvent()
}

// ====================
//      ANIMATIONS
// ====================

function contactLoad() {
    // grab form card
    const card = document.getElementById('contact-form')
    // set new timeline
    const t1 = new TimelineMax()
    // fade in and drop down
    t1.fromTo(card, 1, { opacity: 0, yPercent: -10 }, { opacity: 1, yPercent: 0, ease: Power3.easeOut })
    // return timeline
    return t1
}

function contactHide() {
    // grab form card
    const card = document.getElementById('contact-form')
    // set new timeline
    const t1 = new TimelineMax({ onComplete: dismountPage })
    // fade out and slide up
    t1.to(card, 0.5,{ opacity: 0, yPercent: -10, ease: Power3.easeOut })
    // return timeline
    return t1
}

function animateInAlertMessage() {
    // grab element
    const alert = document.querySelector('form > p.alert')
    // set timeline
    const t1 = new TimelineMax()
    // drop down and fade in
    t1.fromTo(alert, 0.5, { opacity: 0, yPercent: -40 }, { opacity: 1, yPercent: 0, ease: Power1.easeOut })
    // return timeline
    return t1
}

function animateOutAlertMessage() {
    // grab element
    const alert = document.querySelector('form > p.alert')
    console.log('animating out!')
    // set timeline
    const t1 = new TimelineMax({ onComplete: resetAlertElement })
    // drop down and fade in
    t1.to(alert, 0.5, { opacity: 0, yPercent: -40, ease: Power3.easeOut })
    // return timeline
    return t1
}

// ====================
//       EVENTS
// ====================

function addFormSubmitEvent() {
    // get form
    const form = document.querySelector('#contact-form > form')
    // submit event
    form.addEventListener('submit', e => {
        e.preventDefault()
        // grab form
        const form = e.target
        // get contact fields
        const name = document.querySelector('form > input[type=text]').value
        const email = document.querySelector('form > input[type=email').value
        const message = document.querySelector('form > textarea').value
        // SEND EMAIL USING SMTP-JS
        sendEmail(name, email, message)
        // reset form
        form.reset()
    })
}

function sendEmail(name, email, message) {
    Email.send({
            Host : "smtp.gmail.com",
            Username : "alecgrey.portfolio@gmail.com",
            Password : "portfolio",
            To : 'alecgrey.coding@gmail.com',
            From : "alecgrey.portfolio@gmail.com",
            Subject : `${name} sent you a message!`,
            Body : `Name 🧑: ${name}<br/>Email 📮: ${email}<br/>Message 💬:<br/>${message}`
        }).then(messageSuccessAlert);
}

function messageSuccessAlert() {
    // fill in alert text
    const alert = document.querySelector('form > p.alert')
    alert.classList.add('success')
    alert.textContent = 'Your message has been sent successfully!'
    // animate in alert
    animateInAlertMessage()
    // animate out alert after brief period
    setTimeout(() => {
        animateOutAlertMessage()
    }, 3000)
}

function resetAlertElement() {
    const alert = document.querySelector('form > p.alert')
    alert.className = 'alert'
    alert.textContent = ''
}

// ====================
//      PAGE HTML
// ====================

const mainHTML = `
<div id='contact-form'>
    <div>
        <img src='./assets/contact-me.jpg' alt='meow meow meow meow meow meow meow'>
        <h3>Let's start a conversation 😸</h3>
    </div>
    <form>
        <input type='text' placeholder='Bob Loblaw' required minlength="5">
        <input type='email' placeholder='email@email.email' required minlength="8">
        <textarea rows='3' placeholder="Why, hello der." required minlength="20"></textarea>
        <input type='submit' value='Submit'>
        <p class='alert'></p>
    </form>
</div>
`

