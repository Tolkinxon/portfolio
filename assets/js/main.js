/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

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
  // on('scroll', '.mobile-nav-toggle', function(e) {

  //   select('body').classList.toggle('mobile-nav-active')
  //   this.classList.toggle('bi-list')
  //   this.classList.toggle('bi-x')
  // })

  
  // navbar hiding and showing side by scrolling
  document.addEventListener('scroll', function (evt) {
  if(window.scrollY == 0) {
    select('body').classList.add('mobile-nav-active')
  }
  else {
    select('body').classList.remove('mobile-nav-active')
  }
  })  
  // end navbar hiding and showing side by scrolling



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
const portfoliosTemplate = document.querySelector('#portfolios').content
const portfolioList = document.querySelector('.portfolio-container')
const portfolioDetailsImgTemplate = document.querySelector('#portfolio-details__img').content
const portfolioDetailsImgList = document.querySelector('.swiper-wrapper-for-porfolio-details')
const clientCompany = document.querySelector('.client')
const category = document.querySelector('.category')



function renderForPortfolios(arr, node) {
    node.innerHTML = null
    const fragment = document.createDocumentFragment()

    arr.forEach(item => {
        const { location, cropped_photo, project_type, id } = item
        const clonePortfolios = portfoliosTemplate.cloneNode(true)

        clonePortfolios.querySelector('.portfolio-wrapper').classList.add(`${project_type}`)
        clonePortfolios.querySelector('.portfolio-img').src = cropped_photo
        clonePortfolios.querySelector('.portfolio-location').textContent = location
        clonePortfolios.querySelector('.before').id = id

        fragment.appendChild(clonePortfolios)
    })

    node.appendChild(fragment)
}

function renderForPortfolioDetailsImg(data, node) {
  console.log(data);
  const { project_type, client, photos } = data
  clientCompany.textContent = client
  category.textContent = project_type

  node.innerHTML = null
  const fragment = document.createDocumentFragment()

  photos.forEach(item => {
      const { url } = item
      const clonePortfolioDetails = portfolioDetailsImgTemplate.cloneNode(true)

      clonePortfolioDetails.querySelector('.img').src = url
    

      fragment.appendChild(clonePortfolioDetails)
  })

  node.appendChild(fragment)
}


(async () => {
    const request = await fetch('http://13.233.132.195:8000/api/project/?type=all', {
      headers:{
        'accept': 'application/json',
        'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
      }  
    })

    const data = await request.json()
    renderForPortfolios(data, portfolioList)

      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });
  
        let portfolioFilters = select('#portfolio-flters li', true);
  
        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          
          portfolioIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }

})()


window.addEventListener('DOMContentLoaded', () => {
  
  const imgShowing  = document.querySelector('.img-showing')
  const wrapper = document.querySelector('.wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  const portfolioContainer = document.querySelector('.portfolio-container')
  const before = document.querySelectorAll('.before')
  const closeBtn = document.querySelector('.img-showing__close')
  const aloneImg = document.querySelectorAll('.img-showing__alone-img')
  const prev = document.querySelector('.img-showing__prev')
  const next = document.querySelector('.img-showing__next') 
  const closeP = document.querySelector('.closeP')
  const portfolioFilters = document.querySelector('#portfolio-flters')


//------------------------ portfolios openning and closing side -------------------------
  portfolioContainer.addEventListener('click', (evt) => {
    if(evt.target.matches('.before')){
      imgShowing.style.display = 'none'
      mainWrapper.style.display = 'none'
      wrapper.style.display = 'block'
      const id = evt.target.id


      const fetchingProjectsWithId = async () => {
        const request = await fetch(`http://13.233.132.195:8000/api/project/${id}`, {
          headers:{
            'accept': 'application/json',
            'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
          }  
        })
  
        const data = await request.json()
        renderForPortfolioDetailsImg(data, portfolioDetailsImgList)

        const img = document.querySelectorAll('.img')
        img.forEach(item => {
          item.addEventListener('click', () => {
            imgShowing.style.display = 'flex'
            mainWrapper.style.display = 'none'
            wrapper.style.display = 'none'
        }) 
        })
      }
  
      fetchingProjectsWithId()
    }
  })
//------------------------ portfolios openning and closing side -------------------------




  
  //--------------------- showing and hiding side when clicking --------------------------



  
  closeBtn.addEventListener('click', () => {
    imgShowing.style.display = 'none'
    mainWrapper.style.display = 'none'
    wrapper.style.display = 'block'
  }) 
  
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
new Swiper('.portfolio-details-slider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

  /**
   * Testimonials slider
   */
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




