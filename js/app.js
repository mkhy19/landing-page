/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**************************************************/

// Define Global Variables

const navElements = document.querySelectorAll('section')
const navList = document.getElementById('navbar__list')

// End Global Variables

/**************************************************/

// Begin Main Functions

// Build menu 
// create a navigation menu based on the sections of the page
navElements.forEach(el => {
    const navlistElement = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`
    // add each navigation item to your menu
    navList.insertAdjacentHTML('beforeend', navlistElement)
  })

// Build the nav
// by clicking on a navigation item should scroll to the appropriate section of the page
navList.addEventListener('click', e => {
    e.preventDefault()
    const parent = e.target.hasAttribute('data-link') ? e.target : e.target.parentElement

    // Scroll to anchor ID using scrollTO event: Scroll to section on link click
    // functionality to scroll to sections using scrollIntoView the most simple JS methods for scrolling
    const elementToScrollTo = document.getElementById(parent.dataset.link)
    elementToScrollTo.scrollIntoView({behavior: "smooth", block: "end", inline: "end"})
  })

// Add class 'active' to section when near top of viewport
const callbackfn = entries => {
    entries.forEach(entry => {
      const navListElement = document.querySelector(
        `.menu__link[data-link='${entry.target.id}']`,
      )
      const section = document.getElementById(entry.target.id)
  
      // Set sections as active
      // functionality to distinguish the section in view: to highlight active section
      // using classList methods to change the CSS being displayed. add, remove and contains methods
      if (entry && entry.isIntersecting) {
        navListElement.classList.add('active')
        section.classList.add('active')
      }
      
      else {
        if (navListElement.classList.contains('active')) {
          navListElement.classList.remove('active')
        }
        if (section.classList.contains('active')) {
          section.classList.remove('active')
        }
      }
    })
  }

// End Main Functions
