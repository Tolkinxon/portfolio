/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/



// function autoRefresh() {
//   window.location = window.location.href;
// }


// if(localStorage.getItem('reload') !== 'true') {
//   autoRefresh()
// }



// window.addEventListener('beforeunload', (event) => {
//   localStorage.clear();  
// });





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
  

  let counter = 0
  // // navbar hiding and showing side by scrolling
  document.addEventListener('scroll', function (evt) {
  if(window.scrollY == 0) {
    select('body').classList.add('mobile-nav-active')
  }
  else {
      if(counter == 0){
        document.querySelector('.archviz').click()
        counter++
      
      }
      if(counter == 1){
        document.querySelector('.all').click()
        counter++
      }
    select('body').classList.remove('mobile-nav-active')
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
const portfoliosTemplate = document.querySelector('#portfolios').content
const portfolioList = document.querySelector('.portfolio-container')
const portfolioDetailsImgTemplate = document.querySelector('#portfolio-details__img').content
const portfolioDetailsImgList = document.querySelector('.swiper-wrapper-for-porfolio-details')
const caruselTemplate = document.querySelector('#carusel-template').content
const caruselList = document.querySelector('.carousel-inner')
const testimonialItemTemplate = document.querySelector('#testimonial-item-template').content
const testimonialItemList = document.querySelector('.testimonial-item-template-list')

const titlePortfolioDetails = document.querySelector('.title-portfolio-details')
const locationPortfoioDetails = document.querySelector('.location-portfolio-details')
const urlPortfoioDetails = document.querySelector('.url-portfolio-details')
const descriptionPortfoioDetails = document.querySelector('.description-portfolio-details')



function renderForPortfolios(arr, node) {
    node.innerHTML = null
    const fragment = document.createDocumentFragment()

    arr.forEach(item => {
        const { title, cropped_photo, project_type, id } = item
        const clonePortfolios = portfoliosTemplate.cloneNode(true)

        clonePortfolios.querySelector('.portfolio-wrapper').classList.add(`${project_type}`)
        clonePortfolios.querySelector('.portfolio-img').src = cropped_photo
        clonePortfolios.querySelector('.portfolio-location').textContent = title
        clonePortfolios.querySelector('.before').id = id

        fragment.appendChild(clonePortfolios)
    })

    node.appendChild(fragment)
}

function renderForPortfolioDetailsImg(data, node, template) {
  const {location, description, url, title, photos } = data

  titlePortfolioDetails.textContent = title
  locationPortfoioDetails.textContent = location
  descriptionPortfoioDetails.textContent = description
  urlPortfoioDetails.textContent = url


  node.innerHTML = null
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

function renderForTestimonial( arr, node, template ) {

  node.innerHTML = null
  const fragment = document.createDocumentFragment()

  arr.forEach(item => {
      const { job, full_name, avatar, comment } = item
      const cloneTemplate = template.cloneNode(true)

      cloneTemplate.querySelector('.testimonial-item__comment').textContent = comment
      cloneTemplate.querySelector('.testimonial-item__full_name').textContent = full_name
      cloneTemplate.querySelector('.testimonial-item__job').textContent = job
      cloneTemplate.querySelector('.testimonial-item__avatar').src = avatar


      fragment.appendChild(cloneTemplate)
  })

  node.appendChild(fragment)
}

// (() => {
//   fetch('http://13.233.132.195:8000/api/project/?type=all', {
//     headers:{
//       'accept': 'application/json',
//       'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
//     }  
//   })
//   .then(data => data.json())
//   .then(response => {
//     renderForPortfolios(response, portfolioList)

//     let portfolioContainer = select('.portfolio-container');
//     if (portfolioContainer) {
//       let portfolioIsotope = new Isotope(portfolioContainer, {
//         itemSelector: '.portfolio-item'
//       });

//       let portfolioFilters = select('#portfolio-flters li', true);

//       on('click', '#portfolio-flters li', function(e) {
//         e.preventDefault();
//         portfolioFilters.forEach(function(el) {
//           el.classList.remove('filter-active');
//         });
//         this.classList.add('filter-active');

//         portfolioIsotope.arrange({
//           filter: this.getAttribute('data-filter')
//         });
        
//         portfolioIsotope.on('arrangeComplete', function() {
//           AOS.refresh()
//         });
//       }, true);
//     }
//   })
// })()


(async () => {
    const request = await fetch('https://test.itpoint.uz/api/project/?type=all', {
      headers:{                  
        'accept': 'application/json',
        'X-CSRFToken': 'fBjcq6LyPdHYWcpgEjeOw97FI7Y31H0wcTEKzS2jZwTJvvtHUjO6GGsOMHIHXHbj'
      }  
    })

    const data = await request.json()

    const archvizData = await data.filter(item => item.project_type == 'archviz')
          .sort((a, b) => 0.5 - Math.random());
    const interiorData = await data.filter(item => item.project_type == 'interior')
          .sort((a, b) => 0.5 - Math.random());
    const exteriorData = await data.filter(item => item.project_type == 'exterior')
          .sort((a, b) => 0.5 - Math.random());

          function sliceData(arr) {
            if(arr.length > 3){
              return arr.slice(0, 3)
            }
            else {
              return arr
            }
          }

    const allRandomSlicedData = [...sliceData(archvizData),...sliceData(interiorData),...sliceData(exteriorData)]
   
    renderForPortfolios(allRandomSlicedData, portfolioList)

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

    const loader = document.querySelector('.portfolio-loader-wrapper')
    const seeMore = document.querySelector('.portfolio__see-more')
    const displayNoneForSeeMore = document.querySelectorAll('.display-none-for-see-more')
    const closeIcon = document.querySelector('.close-icon')
    

    seeMore.addEventListener('click', () => {
      closeIcon.style.display = 'block'
      displayNoneForSeeMore.forEach(item => {
        item.classList.add('visually-hidden')
      })
      seeMore.classList.add('visually-hidden')  
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
      window.scrollTo({
        top: 0,
      })
      setTimeout(() => {
        document.querySelector('.archviz').click();
      },1000)     
      setTimeout(() => {
        document.querySelector('.all').click();
      },2000)  
    })

   

    closeIcon.addEventListener('click', () => {
      closeIcon.style.display = 'none'
      displayNoneForSeeMore.forEach(item => {
        item.classList.remove('visually-hidden')
      })
      seeMore.classList.remove('visually-hidden')
      renderForPortfolios(allRandomSlicedData, portfolioList)

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
      window.scrollTo({
        top: 0,
      })
      counter = 0
    })

    if(data) {
      document.body.style.overflow = 'auto'
      loader.style.display = 'none'


      
    }
    



  //--------------------------------------------------------------------------------------------------
  // data fetching for testimonial side
  const requestTestimonialItem = await fetch('https://test.itpoint.uz/api/commentary', {
    headers:{
      'accept': 'application/json',
      'X-CSRFToken': 'GJcGnVz5mEfkDnWaTRFbsVdUAXq9FxU5Iw07Jk9Sv2bPuvKw7Fp2uOlyozpuOx6V'
    }  
  })

  const dataTestimonialItem = await requestTestimonialItem.json()
  renderForTestimonial(dataTestimonialItem, testimonialItemList, testimonialItemTemplate)

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

})()


window.addEventListener('DOMContentLoaded', () => {
  
  const imgShowing  = document.querySelector('.img-showing')
  const wrapper = document.querySelector('.wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  const portfolioContainer = document.querySelector('.portfolio-container')
  const closeBtn = document.querySelector('.img-showing__close')
  const closeP = document.querySelector('.closeP')




//------------------------ portfolios openning and closing side -------------------------
  portfolioContainer.addEventListener('click', (evt) => {
    if(evt.target.matches('.before')){
      imgShowing.style.display = 'none'
      mainWrapper.style.display = 'none'
      wrapper.style.display = 'block'
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
        renderForPortfolioDetailsImg(data, caruselList, caruselTemplate)
 

        const img = document.querySelectorAll('.img')
        img.forEach(item => {
          item.addEventListener('click', () => {
            imgShowing.style.display = 'flex'
            imgShowing.querySelectorAll('.img-carusel').forEach(itemCarusel => {
              if(itemCarusel.id == item.id){
                itemCarusel.parentElement.classList.add('active')
              }
              else {
                itemCarusel.parentElement.classList.remove('active')
              }
            })
            mainWrapper.style.display = 'none'
            wrapper.style.display = 'none'
        }) 
        })

        // codes for zoom-in and zoom-out
        const carusel = document.querySelector('#carouselExampleIndicators')
        const imgCarusel = document.querySelectorAll('.img-carusel')

        imgCarusel.forEach(item => {
          item.addEventListener('click', ()=>{
            carusel.classList.toggle('zoom')
            item.classList.toggle('zoom-out')
          })
        })
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




