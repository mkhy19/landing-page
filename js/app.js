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

// Intersection Observer API that compute which section is in the viewport to help us see the active section in the navbar changes automatically as we scroll
// Intersection Observer provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
}

const observer = new IntersectionObserver(callbackfn, options)
navElements.forEach(elment => {
  observer.observe(document.getElementById(elment.id))
})
// End Main Functions

/*
window.addEventListener('scroll', function (event) {
	if (isOnScreen(navElements)) {
		navElements.innerHTML = '<section data-nav="' + navElements.getAttribute('section') + '">';
	}
}, false);

var isOnScreen = function (navElements, buffer) {
  //buffer is optional and allows you to return true when  
  //the element is going to appear to the screen  
  buffer = typeof buffer === 'undefined' ? 0 : buffer;
  //buffer = 0;
  
  // Getting the bounding coordinates
  // Get element's position in the viewport
  // Get it's position in the viewport
  const bounding = navElements.getBoundingClientRect();

  // Log the results
  //console.log(bounding);

  // Check if element is in the viewport 
  // Determining if the element is in the viewport using , we have to get the viewport’s width and the viewport’s height
    // window.innerWidth, document.documentElement.clientWidth
    // window.innerHeight , document.documentElement.clientHeight
  if (bounding.top >= buffer && 
    bounding.left >= buffer &&
    // fallback for browser compatibility 
    bounding.right <= ((window.innerWidth || document.documentElement.clientWidth) - buffer) &&
    bounding.bottom <= ((window.innerHeight || document.documentElement.clientHeight) - buffer)) {
      console.log('In the viewport!');
      return true
  } else {
      console.log('Not in the viewport... whomp whomp');
      return false;
  }
}
*/

