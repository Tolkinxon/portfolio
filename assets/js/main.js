(function() {
  "use strict";
  /**
   * Easy selector helper function
   */

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {

    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-x')
    this.classList.toggle('bi-list')
  })
  


  // // navbar hiding and showing side by scrolling
  document.addEventListener('scroll', function (evt) {
    if(window.scrollY == 0) {
      select('.mobile-nav-toggle').click()
    }
    else {
        select('body').classList.remove('mobile-nav-active')
        select('.mobile-nav-toggle').classList.remove('bi-x')
        select('.mobile-nav-toggle').classList.add('bi-list')
    }
  })  
  // end navbar hiding and showing side by scrolling

  
  const hero = document.querySelector('#hero')
  hero.addEventListener('click', (evt) => {
    select('body').classList.remove('mobile-nav-active')
  })



  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  // ---------------------------------------- FIRST SIDE ---------------------------------

const portfolioDetailsImgTemplate = document.querySelector('#portfolio-details__img').content
const portfolioDetailsImgList = document.querySelector('.swiper-wrapper-for-porfolio-details')
const caruselTemplate = document.querySelector('#carusel-template').content
// const caruselList = document.querySelector('.carousel-inner')
const portfolioContainer = document.querySelector('.portfolio-container')


const titlePortfolioDetails = document.querySelector('.title-portfolio-details')
const locationPortfoioDetails = document.querySelector('.location-portfolio-details')
const urlPortfoioDetails = document.querySelector('.url-portfolio-details')
const descriptionPortfoioDetails = document.querySelector('.description-portfolio-details')

const loader = document.querySelector('.portfolio-loader-wrapper')
const seeMore = document.querySelector('.portfolio__see-more')
const displayNoneForSeeMore = document.querySelectorAll('.display-none-for-see-more')
const closeIcon = document.querySelector('.close-icon')
const portfolioContainerSeeMore = document.querySelector('.portfolio-container-see-more')
 


function renderForPortfolioDetailsImg(data, node, template) {
  const {location, description, url, title, photos } = data

  titlePortfolioDetails.textContent = title
  locationPortfoioDetails.textContent = location
  descriptionPortfoioDetails.textContent = description
  // urlPortfoioDetails.textContent = url


  node.innerHTML = '';
  const fragment = document.createDocumentFragment()

  photos.forEach(item => {
      const { url, id } = item
      const clonePortfolioDetails = template.cloneNode(true)

      clonePortfolioDetails.querySelector('.img').src = url
      clonePortfolioDetails.querySelector('.img').id = id
    
      fragment.appendChild(clonePortfolioDetails)
  })
  node.appendChild(fragment)
}



new Swiper('.testimonials-slider', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});






seeMore.addEventListener('click', () => {
  closeIcon.style.display = 'block'
  displayNoneForSeeMore.forEach(item => {
    item.classList.add('visually-hidden')
  })
  seeMore.classList.add('visually-hidden')  
  portfolioContainer.style.display = 'none'
  portfolioContainerSeeMore.classList.remove('visually-hidden')
  
  window.scrollTo({
    top: 0,
  })
  // setTimeout(() => {
  //   document.querySelector('.exterior').click();
  // },10000)     
  // setTimeout(() => {
  //   document.querySelector('.all').click();
  // },20000)  
})

closeIcon.addEventListener('click', () => {
  closeIcon.style.display = 'none'
  displayNoneForSeeMore.forEach(item => {
    item.classList.remove('visually-hidden')
  })
  seeMore.classList.remove('visually-hidden')
  portfolioContainer.style.display = 'block'
  portfolioContainerSeeMore.classList.add('visually-hidden')

  window.scrollTo({
    top: 0,
  })
  counter = 0
})

window.addEventListener('DOMContentLoaded', () => {
  
  const imgShowing  = document.querySelector('.img-showing')
  const wrapper = document.querySelector('.wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  const closeP = document.querySelector('.closeP')


//------------------------ portfolios openning and closing side -------------------------
  portfolioContainer.addEventListener('click', (evt) => {
    if(evt.target.matches('.before')){
      mainWrapper.style.display = 'none'
      wrapper.style.display = 'block'
      imgShowing.style.display = 'none'
      const id = evt.target.id


      const fetchingProjectsWithId = async () => {
        const request = await fetch(`https://test.itpoint.uz/api/project/${id}`, {
          headers:{
            'accept': 'application/json',
            'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
          }  
        })
  
        const data = await request.json()

        renderForPortfolioDetailsImg(data, portfolioDetailsImgList, portfolioDetailsImgTemplate)
        // renderForPortfolioDetailsImg(data, caruselList, caruselTemplate)
 

        // const img = document.querySelectorAll('.img')
        // img.forEach(item => {
        //   item.addEventListener('click', () => {
        //     imgShowing.style.display = 'flex'
        //     imgShowing.querySelectorAll('.img-carusel').forEach(itemCarusel => {
        //       if(itemCarusel.id == item.id){
        //         itemCarusel.parentElement.classList.add('active')
        //       }
        //       else {
        //         itemCarusel.parentElement.classList.remove('active')
        //       }
        //     })
        //     mainWrapper.style.display = 'none'
        //     wrapper.style.display = 'none'
        // }) 
        // })

        // codes for zoom-in and zoom-out
        // const carusel = document.querySelector('#carouselExampleIndicators')
        // const imgCarusel = document.querySelectorAll('.img-carusel')

        // imgCarusel.forEach(item => {
        //   item.addEventListener('click', ()=>{
        //     carusel.classList.toggle('zoom')
        //     item.classList.toggle('zoom-out')
        //   })
        // })
        // end codes for zoom-in and zoom-out

        new Swiper('.portfolio-details-slider', {
          speed: 400,
          loop: true,
          // autoplay: {
          //   delay: 400,
          //   disableOnInteraction: false
          // },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }
        });
      }
  
      fetchingProjectsWithId()
    }
  })
//------------------------ portfolios openning and closing side -------------------------

const caruselItem = document.querySelector('.carusel-item');
portfolioDetailsImgList.addEventListener('click', function(evt){
  if(evt.target.matches('.img-carusel')){
    mainWrapper.style.display = 'none'
    wrapper.style.display = 'none'
    imgShowing.style.display = 'block'
    
    caruselItem.innerHTML = ''
    let clone = evt.target.cloneNode(true);
    clone.classList.add('img-carusel__close')
    clone.classList.add('zoom-out')
    caruselItem.append(clone)
  }

  const closeBtn = document.querySelector('.img-carusel__close')

  closeBtn.addEventListener('click', () => {
    imgShowing.style.display = 'none'
    mainWrapper.style.display = 'none'
    wrapper.style.display = 'block'
  }) 
})
  
  // --------------------- showing and hiding side when clicking --------------------------

  
  closeP.addEventListener('click', () => {
    imgShowing.style.display = 'none'
    mainWrapper.style.display = 'block'
    wrapper.style.display = 'none'
  }) 
  // ------------------------- showing and hiding side when clicking ----------------------
  })

// ----------------------------------------END FIRST SIDE ---------------------------------


  /**
   * Porfolio isotope and filter
   */
  // window.addEventListener('load', () => {
  //   let portfolioContainer = select('.portfolio-container');
  //   if (portfolioContainer) {
  //     let portfolioIsotope = new Isotope(portfolioContainer, {
  //       itemSelector: '.portfolio-item'
  //     });

  //     let portfolioFilters = select('#portfolio-flters li', true);

  //     on('click', '#portfolio-flters li', function(e) {
  //       e.preventDefault();
  //       portfolioFilters.forEach(function(el) {
  //         el.classList.remove('filter-active');
  //       });
  //       this.classList.add('filter-active');

  //       portfolioIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
        
  //       portfolioIsotope.on('arrangeComplete', function() {
  //         AOS.refresh()
  //       });
  //     }, true);
  //   }

  // });

/**
   * Initiate portfolio details lightbox 
   */
const portfolioDetailsLightbox = GLightbox({
  selector: '.portfolio-details-lightbox',
  width: '90%',
  height: '90vh'
});

/**
 * Portfolio details slider
 */
// new Swiper('.portfolio-details-slider', {
//   speed: 400,
//   loop: true,
//   autoplay: {
//     delay: 5000,
//     disableOnInteraction: false
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'bullets',
//     clickable: true
//   }
// });

  /**
   * Testimonials slider
   */
  // new Swiper('.testimonials-slider', {
  //   speed: 600,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20
  //     },

  //     1200: {
  //       slidesPerView: 3,
  //       spaceBetween: 20
  //     }
  //   }
  // });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

//https://alikhan-portfolio.s3.amazonaws.com/static/projects/01_View01%20jpg866882
//https://alikhan-portfolio.s3.amazonaws.com/static/projects/saytga.jpg
//https://alikhan-portfolio.s3.amazonaws.com/static/projects/GH_Infinity_Ext_Ren_05.06.2022%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.jpg


